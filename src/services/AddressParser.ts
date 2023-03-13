export class Address {
  static parseTLS(data: Buffer): string {
    return data.toString().split("CONNECT")[1].split(" ")[1].split(":")[0];
  }

  static parsePlain(data: Buffer): string {
    return data.toString().split("Host: ")[1].split("\\n")[0];
  }
}
