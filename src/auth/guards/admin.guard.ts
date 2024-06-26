import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { User } from "@prisma/client";



@Injectable()
export class OnlyAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext):boolean {
        const request = context.switchToHttp().getRequest<{user: User}>()
        const user = request.user

        if(!user.isAdmin) throw new ForbiddenException('You dont have rights')

        return user.isAdmin
    }
}