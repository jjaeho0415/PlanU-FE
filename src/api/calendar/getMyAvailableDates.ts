import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getMyAvailableDates = async (authorization: string, startDate: string, endDate: string) => {
  const response = await api.get<string[]>({
    endpoint: `${apiRoutes.availableDates}?startDate=${startDate}&endDate=${endDate}`,
    authorization,
  });
  return response;
};

export const useGetMyAvailableDates = (
  authorization: string,
  startDate: string,
  endDate: string,
) => {

  return useQuery({
    queryKey: ["MY_AVAILABLE_DATES", startDate, endDate],
    queryFn: () => getMyAvailableDates(authorization, startDate, endDate),
    enabled: !!authorization && !!startDate && !!endDate,
  });
};
