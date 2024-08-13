import auth from "./auth";
import nonAuth from "./nonAuth";

export const MergeCaptionsToVideo = async (
  body: any,
  templateNo: number | null,
  hexCode: any
) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  console.log(body);
  console.log("tempalteNo:", templateNo);
  try {
    return await nonAuth.post(
      `/api/process/createsrt?templateNo=${templateNo}&hexCode=${hexCode.slice(
        1
      )}`,
      body,
      config
    );
  } catch (e) {
    console.log(e);
  }
};
export const GetSampleVideoOnDownload = async (
  body:any,
  sampleNo: number | null,
  templateNo: number | null,
) => {
   const config = {
     headers: { "content-type": "multipart/form-data" },
   };
  try {
    return await nonAuth.post(
      `/api/process/samplevideo?templateNo=${templateNo}&sampleNo=${sampleNo}` ,body,
      config
    );
  } catch (e) {
    console.log(e);
  }
};

export const GetVideoStatus = async () => {
  return await nonAuth.get(`/api/process/getVideoStatus`);
};

export const GenerateCaptionsFromVideoInput = async (body: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  // console.log(body);
  // console.log(config);
  console.log("get transcriptions");
  return await nonAuth.post(`/api/process/getTranscribe`, body, config);
};
