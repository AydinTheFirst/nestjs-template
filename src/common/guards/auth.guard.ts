import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException("Please login to access this resource");
    }

    return true;
  }
}
