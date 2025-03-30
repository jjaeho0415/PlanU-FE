import api from '@api/fetcher';
import { useQuery } from '@tanstack/react-query';
import { isBefore, isSameMonth, parseISO } from 'date-fns';

const getMyAvailableDates = async (
  authorization: string,
  { startDate, endDate }: AvailableDatesParams
): Promise<string[]> => {
  return api.get<string[]>({
    endpoint: `/available-dates?startDate=${startDate}&endDate=${endDate}`,
    authorization,
  });
};

export const useGetMyAvailableDates = (
  authorization: string,
  { startDate, endDate }: AvailableDatesParams
) => {
  const isPastMonth =
    isBefore(parseISO(startDate), new Date()) &&
    !isSameMonth(parseISO(startDate), new Date());

  const isEnabled =
    Boolean(authorization && authorization !== 'null' && startDate && endDate && !isPastMonth);

  return useQuery({
    queryKey: ['MY_AVAILABLE_DATES', startDate, endDate],
    queryFn: () => getMyAvailableDates(authorization, { startDate, endDate }),
    enabled: isEnabled,
  });
};
