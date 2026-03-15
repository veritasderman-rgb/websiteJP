import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: import.meta.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  const content = `
    <script>
      const provider = 'github';
      const token = '${data.access_token}';
      const message = token
        ? 'authorization:' + provider + ':success:' + JSON.stringify({ token, provider })
        : 'authorization:' + provider + ':error:' + JSON.stringify(${JSON.stringify(data)});
      (opener || parent).postMessage(message, origin);
    </script>
  `;

  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
};
