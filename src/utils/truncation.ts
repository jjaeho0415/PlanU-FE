export const getFormattedLocation = (text: string) => {
  const formattedLocation = text.length > 10 ? `${text.slice(0, 10)}...` : text;
  return formattedLocation;
};
