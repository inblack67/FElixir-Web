export const routes = {
  register: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
  login: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
  getMe: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getme`,
  logout: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
};
