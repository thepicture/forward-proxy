export class Session {
  static getWithSession(what: string) {
    return what.replace("${session}", Math.random().toString(36).slice(2));
  }
}
