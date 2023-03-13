export const PROXY_HOST = process.env.PROXY_HOST;
export const PROXY_PORT = Number(process.env.PROXY_PORT);
export const PROXY_USER = process.env.PROXY_USER;
export const PROXY_PASSWORD = process.env.PROXY_PASSWORD;

export const PORT = process.env.PORT || 8080;

export const BYPASS_REGEX =
  process.env.BYPASS_REGEX && new RegExp(process.env.BYPASS_REGEX);
