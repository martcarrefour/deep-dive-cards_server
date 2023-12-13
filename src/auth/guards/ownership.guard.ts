import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { PackService } from 'src/pack/pack.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private readonly packService: PackService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const packId = +context.getArgs()[0].params.packId;
        const user = context.switchToHttp().getRequest().user;

        const pack = await this.packService.findById(packId, user);

        if (!pack || user.id !== pack.userId) {
            throw new ForbiddenException("You do not have permission to access this user's data");
        }

        return user.id === pack.userId;
    }
}
