import nonAuth from "./nonAuth";

// Defaulting the role to developer, to avoid error scenario
export const getExpoTokensUsingGoogleOneTap = (
  oneTapData:any,
  role = 'developer',
  context = 'header'
) => {
  return nonAuth.post('/api/users', {
    ...oneTapData,
    identity: 'google',
    ref: window.location.pathname,
    role,
    context,
  });
};

export const revalidateToken = (accessToken:any) => {
  return nonAuth.get(
    `/api/validateToken?token=${accessToken}&tokenType=accessToken`
  );
};

export const getEarlyAccessApi = (email:any) => {
  return nonAuth.post(`/api/user/register`, { email });
};
