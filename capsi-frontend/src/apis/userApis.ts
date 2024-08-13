import nonAuth from "./nonAuth";

export const createSession = async (payload: any) => {
  return await nonAuth.post(`/api/session/create`, payload);
};


export const validateSession = async (query: any) => {
  return await nonAuth.get(`/api/session/validateId?sessionId=${query}`);
};

export const createAccessToken = async (payload: any) => {
  return await nonAuth.post(`/api/user/create`, payload);
};

export const uploadImage = async (payload: any) => {
  return await nonAuth.post(`/api/card/upload`, payload);
};

export const validateAccessToken = async (token: any, tokenType: any) => {
  return await nonAuth.get(
    `/api/user/validateToken?token=${token}&tokenType=${tokenType}`
  );
};