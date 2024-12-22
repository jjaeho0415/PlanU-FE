import apiRoutes from "@api/apiRoutes";

export const postReissue = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${apiRoutes.reissue}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const { resultMsg } = await response.json();
    throw new Error(resultMsg.message);
  }
  const authorization = response.headers.get("Authorization");
  if (!authorization) {
    throw new Error("Authorization header is missing");
  }

  const accessToken = authorization.split(" ")[1];
  if (!accessToken) {
    throw new Error("Access token is missing in the authorization header");
  }

  return accessToken;
};
