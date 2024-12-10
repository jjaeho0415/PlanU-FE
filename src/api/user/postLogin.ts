import apiRoutes from "@api/apiRoutes";

export const postLogin = async (body: IPostLogin): Promise<string> => {
  const endpoint = `${import.meta.env.VITE_API_URL}${apiRoutes.users}/login`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const authorization = response.headers.get("Authorization");
    console.log(authorization);
    if (!authorization) {
      throw new Error("Authorization header is missing");
    }

    const accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      throw new Error("Access token is missing in the authorization header");
    }

    return accessToken;
  } catch (error) {
    console.error("Error in postLogin:", error);
    throw error;
  }
};
