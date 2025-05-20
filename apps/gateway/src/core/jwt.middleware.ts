import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserPayload } from '../types/user.payload';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly jwtSecret: string;

  constructor(
    configService: ConfigService,
  ) {
    this.jwtSecret = configService.getOrThrow('JWT_SECRET');
  }

  use(req: Request, res: Response, next: Function) {
    const token = this.getTokenByHeader(req);
    if (!token) {
      return next();
    }

    try {
      req.user = jwt.verify(token, this.jwtSecret) as UserPayload;
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    next();
  }

  private getTokenByHeader(req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }
}

