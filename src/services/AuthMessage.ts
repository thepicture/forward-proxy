import { PROXY_PASSWORD, PROXY_USER } from "config";

import { Ip, Port } from "models";
import { Session } from "./Session";

export class AuthMessage {
  static generate(ip: Ip, port: Port) {
    return (
      `CONNECT ${ip}:${port} HTTP/1.1\r\n` +
      `Host: ${ip}:${port}\r\n` +
      `User-Agent: node\r\n` +
      `Proxy-Connection: Keep-Alive\r\n` +
      `Proxy-Authorization: Basic ${Buffer.from(
        `${Session.getWithSession(PROXY_USER)}:${Session.getWithSession(
          PROXY_PASSWORD
        )}`
      ).toString("base64")}\r\n` +
      `\r\n`
    );
  }
}
