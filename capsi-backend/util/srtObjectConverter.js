function secondsToHHMMSSMS(timeString) {
  const d = new Date(parseFloat(timeString));
  return d.toISOString().slice(11, 23).replace(".", ",");
}

function transcriptionItemsToArr(items) {
  let arr = [];
  let i = 1;
  console.log(items);
  items
    .filter((item) => !!item)
    .forEach((item) => {
      const { start, end } = item;
      const start_time = secondsToHHMMSSMS(start);
      const end_time = secondsToHHMMSSMS(end);
      arr.push({
        number: i,
        startTime: start_time,
        endTime: end_time,
        text: item.text,
      });
      i++;
    });
  console.log(arr);
  return arr;
}

function objectsToSrt(subtitles) {
  console.log(subtitles);
  const srtData = subtitles
    .map((subtitle) => {
      const { number, startTime, endTime, text } = subtitle;
      return `${number}\n${startTime} --> ${endTime}\n${text}\n`;
    })
    .join("\n");

  return srtData;
}

module.exports = {
  objectsToSrt,
  transcriptionItemsToArr,
};
