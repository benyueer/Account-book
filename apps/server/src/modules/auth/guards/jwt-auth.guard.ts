import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable, lastValueFrom } from 'rxjs'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import * as rolesDecorator from '../decorators/roles.decorator'

const { ROLES_KEY } = rolesDecorator

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查是否是公共路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    // 执行默认的 JWT 验证
    const result = await super.canActivate(context)
    if (result instanceof Observable) {
      return lastValueFrom(result)
    }
    return result
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    // 如果 JWT 验证失败，抛出异常
    if (err || !user) {
      throw err || new Error('未授权访问')
    }

    // 检查用户角色
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return user
    }

    const hasRole = requiredRoles.some(role => user.roles?.includes(role))
    if (!hasRole) {
      throw new Error('权限不足')
    }

    return user
  }
}
