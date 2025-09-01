import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('RolesGuard - Required roles:', roles);

    if (!roles) {
      console.log('RolesGuard - No roles required, allowing access');
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as Request;
    if (!user) {
      console.log('RolesGuard - No user found in request');
      throw new UnauthorizedException(
        'You need to be authenticated to access this resource',
      );
    }

    console.log(
      'RolesGuard - User found:',
      user.email,
      'with roles:',
      user.roles,
    );

    const isAllowed = this.matchRoles(roles, user.roles);

    if (!isAllowed) {
      console.log('RolesGuard - Access denied');
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    console.log('RolesGuard - Access granted');
    return isAllowed;
  }

  matchRoles = (roles: string[], userRoles: string[]): boolean => {
    console.log('User Roles:', userRoles);
    console.log('Required Roles:', roles);
    return roles.some((role) => userRoles.includes(role));
  };
}
