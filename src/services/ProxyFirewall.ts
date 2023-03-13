import { BYPASS_REGEX } from "config";

import { Ip } from "models";

export class ProxyFirewall {
  static shouldBypassURL = (url: Ip): boolean => {
    if (BYPASS_REGEX) {
      return !BYPASS_REGEX.test(url);
    } else {
      return false;
    }
  };
}
