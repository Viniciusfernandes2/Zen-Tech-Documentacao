import { IUser } from "../../models/UserScheme";

export class UserResponse {
  public static userResponse(user: IUser, message: string) {
    return {
      message,
      user: {
        name: user.name,
        email: user.email,
        numero: user.numero,
      }
    };
  }
}