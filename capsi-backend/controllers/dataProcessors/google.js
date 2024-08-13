module.exports = (rawPayload) => {
  const processedStatus = false;
  // only email is mandatory
  let {
    email,
    name = "",
    email_verified = false,
    picture = "N/A",
    sub: id,
  } = rawPayload;
  if (email && email_verified) {
    return {
      email,
      picture,
      name,
      id,
      processedStatus: true,
    };
  }
  return { processedStatus };
};
