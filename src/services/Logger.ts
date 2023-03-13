const c = console;

export class Logger {
  static log = (log: string) => c.log(`[${new Date().toISOString()}] ${log}`);
  static err = (err: string) => c.error(`[${new Date().toISOString()}] ${err}`);
}
