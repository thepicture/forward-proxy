import { PROXY_PASSWORD, PROXY_USER } from "config";

import { Ip, Port } from "models";

export class AuthMessage {
  static generate(ip: Ip, port: Port) {
    return (
      `CONNECT ${ip}:${port} HTTP/1.1\r\n` +
      `Host: ${ip}:${port}\r\n` +
      `User-Agent: node\r\n` +
      `Proxy-Connection: Keep-Alive\r\n` +
      `Proxy-Authorization: Basic ${Buffer.from(
        `${PROXY_USER}:${PROXY_PASSWORD}`
      ).toString("base64")}\r\n` +
      `\r\n`
    );
  }
}
