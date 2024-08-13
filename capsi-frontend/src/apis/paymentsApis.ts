import auth from "./auth";
import nonAuth from "./nonAuth";



/// payments api
export const stripeCheckout = async (queryParams: any) => {
  const checkoutUrl =
    "/api/payment/checkout" + (queryParams?.path ? `?path=pricing&price=${queryParams.price}` : "");
  return await auth.post(checkoutUrl);
};

export const stripeValidate = async (queryparams: any) => {
  const { success, canceled, session_id } = queryparams;
 
  return await nonAuth.post(
    `/api/payment/validate?success=${success}&canceled=${canceled}&session_id=${session_id}`
  );
};

export const activeSubscription = async () => {
  return await nonAuth.get(`/api/payment/subscription`);
};

export const getAllTransactions = async () => {
  return await nonAuth.get(`/api/payment/transactions`);
};

export const getPreviousSubscription = async () => {
  return await nonAuth.get(`/api/payment/subscription/previous`);
};
export const getUsage = async () => {
  return await auth.get(`/api/payment/usage`);
};

export const deleteSubscription = async () => {
  return await nonAuth.post(`/api/payment/subscription/cancel`);
};


