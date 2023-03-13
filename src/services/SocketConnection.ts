export class SocketConnection {
  static didProxyEstablishConnection = (data: Buffer): boolean =>
    data.toString().includes("200");

  static isConnectionTLS = (data: Buffer): boolean =>
    data.toString().indexOf("CONNECT") !== -1;
}
