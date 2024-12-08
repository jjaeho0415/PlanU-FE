import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postLogin = async (body: IPostLogin): Promise<string> => {
  const endpoint = `${import.meta.env.VITE_API_URL}${apiRoutes.users}/login`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const authorization = response.headers.get("authorization");
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


export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data: IPostLogin) => postLogin(data),
  });
};
