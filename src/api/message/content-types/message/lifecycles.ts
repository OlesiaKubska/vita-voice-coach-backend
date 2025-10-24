type KoaCtx = {
  request?: {
    ip?: string;
    headers?: Record<string, string | string[] | undefined>;
  };
  req?: {
    headers?: Record<string, string | string[] | undefined>;
  };
};

const getClientIp = (ctx?: KoaCtx): string | null => {
  const xf = (ctx?.request?.headers?.['x-forwarded-for'] ??
              ctx?.req?.headers?.['x-forwarded-for']) as string | string[] | undefined;
  if (Array.isArray(xf)) return xf[0] ?? null;
  if (typeof xf === 'string' && xf.length > 0) return xf.split(',')[0].trim();
  return ctx?.request?.ip ?? null;
};

const getUserAgent = (ctx?: KoaCtx): string | null => {
  const ua = ctx?.request?.headers?.['user-agent'] ??
             ctx?.req?.headers?.['user-agent'];
  return (Array.isArray(ua) ? ua[0] : ua) ?? null;
};

export default {
  async beforeCreate(event: any) {
    const ctx: KoaCtx | undefined = strapi?.requestContext?.get?.();
    const ip = getClientIp(ctx);
    const ua = getUserAgent(ctx);

    event.params.data.ip = event.params.data.ip ?? ip;
    event.params.data.userAgent = event.params.data.userAgent ?? ua;

    if (typeof event.params.data.read === 'undefined') {
      event.params.data.read = false;
    }
  },
};