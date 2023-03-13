import net = require("node:net");

export class Socket {
  static create(
    host: string,
    port: number,
    callback: (self: net.Socket) => void
  ) {
    const self = net.connect(
      {
        host,
        port,
      },
      () => callback(self)
    );

    return self;
  }
}
