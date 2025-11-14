import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { AccessTokenPayload } from 'src/types/AccessTokenPayload';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) return true;

        const request: Request = context.switchToHttp().getRequest<Request>();

        const user = request.user as AccessTokenPayload;

        if (!user || !user.role) {
            return false;
        }

        return requiredRoles.includes(user.role);
    }
}
