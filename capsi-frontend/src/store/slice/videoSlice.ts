enum controlsenum {
  captionStyle = "captionStyle",
  downloadVideo = "downloadVideo",
  editTranscript = "editTranscript",
  captionColor = "captionColor",
  default='',
}

const videoSlice = (set: any, get: any) => ({
  selectedLanguage: { value: "", label: "Auto Detect" },

  languageOptions: [
    { value: "", label: "Auto Detect" },
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "zh", label: "Chinese" },
    { value: "ru", label: "Russian" },
    { value: "pt", label: "Portugese" },
  ],

  // sampleVideo: [
  //   {
  //     url: "https://s3.amazonaws.com/i.videocaptions.com/GalGadot.mp4",
  //     thumbnail: "/assets/s4p.jpg",
  //     sampleNumber: 1,
  //   },
  //   {
  //     url: "https://s3.amazonaws.com/i.videocaptions.com/JeffBezos.mp4",
  //     thumbnail: "/assets/s3p.jpg",
  //     sampleNumber: 2,
  //   },
  //   {
  //     url: "https://s3.amazonaws.com/i.videocaptions.com/MrBeast.mp4",
  //     thumbnail: "/assets/s1p.jpg",
  //     sampleNumber: 3,
  //   },
  //   {
  //     url: "https://s3.amazonaws.com/i.videocaptions.com/JoeRogan.mp4",
  //     thumbnail: "/assets/s2p.jpg",
  //     sampleNumber: 4,
  //   },
  // ],

  templateVideos: [
    {
      temp: 1,
      poster: "/assets/Caesar.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/c08e8a45-6280-4dcf-8758-5a395e2f4e7a_output.mp4",
    },
    {
      temp: 2,
      poster: "/assets/Schir.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/ee658033-b6ef-4515-985b-ee5faf6af0a5_output.mp4",
    },
    {
      temp: 3,
      poster: "/assets/Groke.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/09889912-bb09-4996-a4a3-b6194ba35d07_output.mp4",
    },
    {
      temp: 4,
      poster: "/assets/Luffy.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/ba91cb95-66e6-4685-9997-3da489cb041b_output.mp4",
    },
    {
      temp: 5,
      poster: "/assets/robur.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/ba91cb95-66e6-4685-9997-3da489cb041b_output.mp4",
    },
    {
      temp: 6,
      poster: "/assets/Shem.png",
      url: "https://s3.amazonaws.com/i.videocaptionsai.com/ba91cb95-66e6-4685-9997-3da489cb041b_output.mp4",
    },
  ],

  captionColors: [
    { color: "#ffffff" },
    { color: "#f44336" },
    { color: "#e91e62" },
    { color: "#9b27b0" },
    { color: "#683ab7" },
    { color: "#3f51b5" },
    { color: "#2194f3" },
    { color: "#03A9F4" },
    { color: "#00BCD4" },
    { color: "#009688" },
    { color: "#4CAF50" },
    { color: "#8BC34A" },
    { color: "#FFEB3B" },
    { color: "#FFC107" },
    { color: "#FF9800" },
    { color: "#FF5722" },
    { color: "#795548" },
    { color: "#9E9E9E" },
    { color: "#607D8B" },
    { color: "#000000" },
  ],

  isSelectOpen: false,
  isModalVisible: false,
  isProcessing: false,
  // sampleNumber: -1,
  ec2FilePath: null,
  editControls: {
    selectedControl: controlsenum.downloadVideo,
  },

  inputVideo: {
    isSampleVideo: false,
    sampleNumber: null,
    ec2FilePath: "",
    file: null,
    url: "",
    template: 3,
    thumbnail: "",
    captionColor: "",
    transcript: [],
  },

  setEditControls: (control: controlsenum) => {
    set(() => ({ editControls: { selectedControl: control } }));
    console.log(get().editControls);
  },

  setInputVideo: (inputVideo: any) => {
    set(() => ({
      inputVideo: inputVideo,
    }));
    console.log(inputVideo);
    console.log(get().inputVideo);
  },

  setIsProcessing: (isProcessing: boolean) => {
    set(() => ({
      isProcessing: isProcessing,
    }));
  },

  setIsModalVisible: (isModalVisible: boolean) => {
    set(() => ({
      isModalVisible: isModalVisible,
    }));
  },

  setIsSelectOpen: (isSelectOpen: boolean) => {
    set(() => ({
      isSelectOpen: isSelectOpen,
    }));
  },

  // setSampleNumber: (sampleNumber: any) => {
  //   set(() => ({
  //     sampleNumber: sampleNumber,
  //   }));
  //   console.log('sliceUpdate:', get().sampleNumber);
  //   console.log('sliceUpdate:', sampleNumber);
  // },

  setInputFile: (inputFile: any) => {
    set(() => ({
      inputFile: inputFile,
    }));
   
  },
  setEc2FilePath: (ec2FilePath: any) => {
    set(() => ({
      ec2FilePath: ec2FilePath,
    }));
  },
});

export default videoSlice;
