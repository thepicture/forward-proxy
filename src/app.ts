import net = require("node:net");

import {
  BYPASS_REGEX,
  DEFAULT_ADDRESS,
  DEFAULT_PORT,
  TLS_PORT,
  CONNECTION_ESTABLISHED,
  PROXY_HOST,
  PROXY_PORT,
  PORT,
} from "config";

import {
  ProxyFirewall,
  SocketConnection,
  Logger,
  Socket,
  AuthMessage,
  Address,
} from "services";

import { Ip, Port } from "models";

Logger.log(
  BYPASS_REGEX
    ? `using bypass pattern "${BYPASS_REGEX.source}"`
    : "proxying all requests"
);

net
  .createServer(async (clientSocket: net.Socket) => {
    let serverAddress: Ip = DEFAULT_ADDRESS;
    let serverPort: Port = DEFAULT_PORT;

    await new Promise<void>((resolve) => {
      clientSocket.once("data", (data) => {
        if (SocketConnection.isConnectionTLS(data)) {
          serverPort = TLS_PORT;
          serverAddress = Address.parseTLS(data);
        } else {
          serverAddress = Address.parsePlain(data);
        }

        resolve();
      });
    });

    const shouldBypassURL = ProxyFirewall.shouldBypassURL(serverAddress);

    Logger.log(
      `${shouldBypassURL ? "bypassing" : "proxying"} ${serverAddress}`
    );

    let socket: net.Socket;

    if (shouldBypassURL) {
      socket = Socket.create(
        serverAddress,
        serverPort,
        (socket: net.Socket) => {
          clientSocket.write(CONNECTION_ESTABLISHED);
          clientSocket.pipe(socket);
          socket.pipe(clientSocket);
        }
      );
    } else {
      socket = Socket.create(PROXY_HOST, PROXY_PORT, (socket: net.Socket) => {
        const authMessage = AuthMessage.generate(serverAddress, serverPort);

        socket.write(authMessage);
        Logger.log(`CONNECT ${PROXY_HOST}:${PROXY_PORT}`);

        socket.once("data", (data) => {
          if (SocketConnection.didProxyEstablishConnection(data)) {
            clientSocket.write(CONNECTION_ESTABLISHED);
            clientSocket.pipe(socket);
            socket.pipe(clientSocket);
          } else {
            Logger.err(`Failed to authenticate with proxy: ${data}`);
            clientSocket.end();
            socket.end();
          }
        });
      });
    }

    socket.on("error", (err) => {
      Logger.err(`Proxy socket error: ${err}`);
      clientSocket.end();
    });

    clientSocket.on("error", (err) => {
      Logger.err(`Client socket error: ${err}`);
      socket.end();
    });
  })
  .listen(PORT, () => {
    Logger.log(`Proxy server listening on port ${PORT}`);
  });
