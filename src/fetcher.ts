import { routes } from './routes';

export const fetcher = async (url: string) => {
  const res = await fetch(routes.getMe, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};
