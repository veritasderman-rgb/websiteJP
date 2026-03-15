import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ redirect }) => {
  const clientId = import.meta.env.OAUTH_GITHUB_CLIENT_ID;
  const scope = 'repo,user';
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
  return redirect(authUrl, 301);
};
