export interface Env {
  DB: D1Database;
  IG_CLIENT_ID: string;
  IG_CLIENT_SECRET: string;
  REDIRECT_URI: string;
}

export async function handleInstagramConnect(request: Request, env: Env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const userId = url.searchParams.get('state'); // Passed from frontend to map to user

  if (!code || !userId) {
    return Response.json({ error: "Missing authorization code or user state" }, { status: 400 });
  }

  try {
    // Exchange code for short-lived access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: env.IG_CLIENT_ID,
        client_secret: env.IG_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: env.REDIRECT_URI,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error_message) throw new Error(tokenData.error_message);

    const accountId = crypto.randomUUID();

    // Store the access token securely in D1
    await env.DB.prepare(`
      INSERT INTO social_accounts (id, user_id, platform, access_token, platform_user_id)
      VALUES (?, ?, 'instagram', ?, ?)
    `).bind(accountId, userId, tokenData.access_token, tokenData.user_id).run();

    // Redirect user back to the Social Accounts frontend dashboard
    return Response.redirect(`https://omnitoolz.ai/social/accounts?success=instagram`, 302);
    
  } catch (error) {
    console.error("IG Auth Error:", error);
    return Response.redirect(`https://omnitoolz.ai/social/accounts?error=auth_failed`, 302);
  }
}
