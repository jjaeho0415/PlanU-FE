import api from "@api/fetcher";

export const postMyAvailableDates = async (
  token: string,
  availableDates: string[],
) => {  if (!token) return;
  await api.post({
    endpoint: `/available-dates`,
    body: {
      availableDates,
    },
    authorization: token,
  });
};