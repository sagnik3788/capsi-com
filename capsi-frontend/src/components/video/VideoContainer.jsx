import React, { useEffect, useState, useRef } from "react";
import VideoPercentagePopup from '../../layout/video/VideoPercentagePopup';

const FONT_OPTIONS = [
  { name: 'Della Respira ', value: 'Della Respira' },
  { name: 'Gilroy', value: 'Gilroy' },
  { name: 'Clash Display', value: 'Clash Display' },
  { name: 'Clash Grotesk', value: 'Clash Grotesk' },
  { name: 'Work Sans', value: 'Work Sans' },
  { name: 'THICCBOI', value: 'THICCBOI' }
];


const COLOR_OPTIONS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'white', value: '#FFFFFF' }
];

const styles = {
  container: {
    display: 'flex',
    width: '180%',
    gap: '24px',
    padding: '6px',
  },
  videoWrapper: {
    position: 'relative',
    width: '370px', // Phone width
    margin: '0 auto',
  },
  video: {
    width: '100%',
    borderRadius: '12px',
    height: '667px', // Typical phone height
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  subtitleText: {
    position: 'absolute',
    bottom: '390px', // Moved closer to bottom
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '2rem',
    fontWeight: '600',
    maxWidth: '90%',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
    transition: 'all 0.2s ease',
    pointerEvents: 'none',
    WebkitTextStroke: '1px black',
    textStroke: '1px black',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flex: 1,
  },
  panel: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  fontContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  fontOption: {
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
  selectedFont: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00acc1',
  },
  colorContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  colorOption: {
    width: '100%',
    height: '36px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: '1px solid #e2e8f0',
  },
  subtitleTimeline: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  subtitleItem: {
    backgroundColor: '#f9f9f9',
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '5px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.3s',
  },
  activeSubtitle: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00acc1',
  },
};

const VideoContainer = ({ percentage, openPercentage, video, srtUrl }) => {
  const videoRef = useRef(null);
  const [subtitles, setSubtitles] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSrtUrl, setLocalSrtUrl] = useState(null);
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].value);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);

  // Rest of the existing useEffects and helper functions remain the same
  useEffect(() => {
    const downloadSRT = async () => {
      if (!srtUrl) {
        console.log('No SRT URL provided');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(srtUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const srtText = await response.text();
        const blob = new Blob([srtText], { type: 'text/srt' });
        const localUrl = URL.createObjectURL(blob);
        setLocalSrtUrl(localUrl);

        setSubtitles(parseSRT(srtText));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    downloadSRT();

    return () => {
      if (localSrtUrl) URL.revokeObjectURL(localSrtUrl);
    };
  }, [srtUrl]);

  useEffect(() => {
    if (!videoRef.current || subtitles.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      const currentSubtitle = subtitles.find(sub => 
        currentTime >= sub.startTime && currentTime <= sub.endTime
      );
      setCurrentText(currentSubtitle ? currentSubtitle.text : '');
    };

    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
  }, [subtitles]);

  const timeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const [secs, ms] = seconds.split(',');
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(secs) +
      parseInt(ms) / 1000
    );
  };

  const parseSRT = (srtText) => {
    return srtText.trim().split('\n\n').map((block, index) => {
      const lines = block.trim().split('\n');
      if (lines.length < 3) return null;

      const [start, end] = lines[1].split(' --> ');
      const text = lines.slice(2).join(' ');

      return {
        id: index + 1,
        timeStart: start,
        timeEnd: end,
        startTime: timeToSeconds(start),
        endTime: timeToSeconds(end),
        text: text,
      };
    }).filter(Boolean);
  };

  return (
    <div style={styles.container}>
      <div style={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={video}
          controls
          style={styles.video}
        />
        
        {loading && <div style={styles.overlay}>Downloading subtitles...</div>}
        {error && <div style={{ ...styles.overlay, backgroundColor: 'rgba(255, 0, 0, 0.75)' }}>Error: {error}</div>}
        {currentText && (
          <div style={{ ...styles.subtitleText, fontFamily: selectedFont, color: selectedColor }}>
            {currentText}
          </div>
        )}
        {openPercentage && <VideoPercentagePopup percentage={percentage} />}
      </div>

      <div style={styles.controlsContainer}>
        <div style={styles.panel}>
          <h3 className="text-lg font-semibold mb-4">Font Selection</h3>
          <div style={styles.fontContainer}>
            {FONT_OPTIONS.map((font) => (
              <div
                key={font.value}
                style={{
                  ...styles.fontOption,
                  ...(selectedFont === font.value ? styles.selectedFont : {})
                }}
                onClick={() => setSelectedFont(font.value)}
              >
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Subtitle Color</h3>
          <div style={styles.colorContainer}>
            {COLOR_OPTIONS.map((color) => (
              <div
                key={color.value}
                style={{
                  ...styles.colorOption,
                  backgroundColor: color.value,
                  border: selectedColor === color.value ? '2px solid #00acc1' : '1px solid #e2e8f0'
                }}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Subtitles Timeline</h3>
            {localSrtUrl && (
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = localSrtUrl;
                  link.download = 'subtitles.srt';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download SRT
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-4">Loading subtitles...</div>
          ) : (
            <div style={styles.subtitleTimeline}>
              {subtitles.map((subtitle) => (
                <div 
                  key={subtitle.id}
                  style={{
                    ...styles.subtitleItem,
                    ...(currentText === subtitle.text ? styles.activeSubtitle : {}),
                  }}
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{subtitle.timeStart}</span>
                    <span>{subtitle.timeEnd}</span>
                  </div>
                  <p className="text-gray-800">{subtitle.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;