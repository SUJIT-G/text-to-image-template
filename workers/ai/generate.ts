import { Ai } from '@cloudflare/ai';

export interface Env {
  AI: any;
  BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ai = new Ai(env.AI);
    const { prompt, type } = await request.json();

    if (type === 'text') {
      // LLM-3 for Captions/Hashtags
      const response = await ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { role: 'system', content: 'You are a social media expert for OmniToolz AI.' },
          { role: 'user', content: `Create a viral caption and 10 hashtags for: ${prompt}` }
        ]
      });
      return Response.json(response);
    }

    if (type === 'image') {
      // Stable Diffusion for Visuals
      const binaryImage = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
        prompt: prompt
      });
      
      const id = crypto.randomUUID();
      await env.BUCKET.put(`generated/${id}.png`, binaryImage);
      
      return Response.json({ url: `https://cdn.omnitoolz.ai/generated/${id}.png` });
    }

    return new Response("Invalid type", { status: 400 });
  }
}
