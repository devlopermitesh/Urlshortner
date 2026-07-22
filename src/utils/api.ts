/// <reference types="vite/client" />
const BaseUrl = import.meta.env.VITE_API_URL;
export const api = async (endpoint: string, option?: RequestInit) => {
  if (!BaseUrl) throw new Error('Api Url location is missing');

  const response = await fetch(`${BaseUrl}/api/v1/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...option?.headers,
    },
    ...option,
  });
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  return response.json();
};
