import useAuthStore from "@store/useAuthStore";
import { postReissue } from "./user/postReissue";
import useBottomStore from "@store/useBottomStore";
import useLocationInfoStore from "@store/useLocationInfoStore";

interface IFetchOptions<T = unknown> {
  endpoint: string;
  body?: T;
  method?: string;
  authorization?: string;
  id?: string;
}

interface IGetOptions {
  endpoint: string;
  authorization?: string;
}

interface IPostOptions<T = unknown> {
  endpoint: string;
  body?: T;
  authorization?: string;
}

interface IDeleteOptions {
  endpoint: string;
  authorization?: string;
}

const _fetch = async <T = unknown, R = unknown>({
  method,
  endpoint,
  body,
  authorization,
}: IFetchOptions<T>): Promise<R> => {
  const { clearAuth } = useAuthStore.getState();
  const { clearBottomState } = useBottomStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers.Authorization = "Bearer " + authorization;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body instanceof FormData) {
    delete headers["Content-Type"];
    requestOptions.body = body;
  } else if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, requestOptions);

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        try {
          const newAccessToken = await postReissue();
          if (newAccessToken) {
            useAuthStore.getState().setAccessToken(newAccessToken);

            headers.Authorization = "Bearer " + newAccessToken;
            const retryRequestOptions: RequestInit = {
              ...requestOptions,
              headers,
            };
            const retryRes = await fetch(
              `${import.meta.env.VITE_API_URL}${endpoint}`,
              retryRequestOptions,
            );

            if (!retryRes.ok) {
              const { resultMsg } = await retryRes.json();
              throw new Error(resultMsg.message);
            }
            return await retryRes.json();
          }
        } catch (error) {
          clearAuth();
          clearBottomState();
          clearLocationInfo();
          window.history.replaceState(null, "", window.location.origin);
          throw new Error("Session expired. Please log in again.");
        }
      }
      const { resultMsg } = await res.json();
      throw new Error(resultMsg);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};

// T: 요청 body의 타입,
// R: 응답 body의 타입

const _get = async <R = unknown>({ endpoint, authorization }: IGetOptions): Promise<R> => {
  return _fetch<never, R>({ method: "GET", endpoint, authorization });
};

const _post = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "POST", endpoint, body, authorization });
};

const _patch = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "PATCH", endpoint, body, authorization });
};

const _put = async <T = unknown, R = unknown>({
  endpoint,
  body,
  authorization,
}: IPostOptions<T>): Promise<R> => {
  return _fetch<T, R>({ method: "PUT", endpoint, body, authorization });
};

const _delete = async <R = unknown>({ endpoint, authorization }: IDeleteOptions): Promise<R> => {
  return _fetch<never, R>({ method: "DELETE", authorization, endpoint });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
  put: _put,
  delete: _delete,
};

export default api;
