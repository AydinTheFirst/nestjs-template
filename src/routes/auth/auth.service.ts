import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  login() {
    return "Login";
  }

  register() {
    return "Register";
  }
}
