const apiUrl = "/"; // This assumes your Flask routes are at the root

export const getHello = async (): Promise<string> => {
  const response = await fetch(apiUrl);
  const data = await response.text();
  return data;
};
