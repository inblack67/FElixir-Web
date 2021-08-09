export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  const resData = await res.json();
  return resData;
};
