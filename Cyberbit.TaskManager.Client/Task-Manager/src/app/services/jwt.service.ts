export class JwtUtils {

  public getPropertyFromToken(prop: string, token: string): string {
    if (!!prop && !!token) {
      const tokenPayload = atob(token.split('.')[1]);
      if (tokenPayload) {
        try {
          const tokenPayloadObj = JSON.parse(tokenPayload);
          return tokenPayloadObj[prop];
        } catch {
        }
      }
    }

    return "";
  }

}
