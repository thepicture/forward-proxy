# Forward proxy

Allows to proxy an authenticated proxy to local address

## Install without Docker

```bash
npm i
```

## Run without Docker

```bash
BYPASS_REGEX='ad' \
PROXY_HOST='example.com' \
PROXY_PORT='1234' \
PROXY_USER='user' \
PROXY_PASSWORD='password' \
PORT=8080 \
npm start
```

## Environment variables

`BYPASS_REGEX` - if declared, will be used to _not_ proxy incoming address request. e.g. `BYPASS_REGEX='ad'` will bypass `example.ad.com`, `ad.example.com`,`example.com.ad`. Equivalent to `new RegExp(BYPASS_REGEX)`

`PROXY_HOST`, `PROXY_PORT`, `PROXY_USER`, `PROXY_PASSWORD` - declare a end proxy that the local proxy will use to pipe requests

`PORT` - on what port will the local proxy listen to, if omitted, sets to `8080`

## Goal

Make apps that support proxy to support authenticated proxy with url filter

## Structure

```

[client] -> [local server] -> [authenticated proxy] -> [endpoint]
pipe pipe call

[client] <- [local server] <- [authenticated proxy] <- [endpoint]
pipe pipe byte

```
