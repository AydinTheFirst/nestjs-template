import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

import { PrismaService } from '~/database';

import { TokensService } from '../tokens';

@Injectable()
export class GoogleService {
  private oauthClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {
    this.oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  async login(code: string) {
    const { tokens } = await this.oauthClient.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    this.oauthClient.setCredentials(tokens);

    const ticket = await this.oauthClient.verifyIdToken({
      idToken: tokens.id_token ?? '',
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new BadRequestException('Unable to fetch user info from Google');
    }

    let user = await this.prisma.user.findUnique({
      where: { googleId: payload.sub },
    });

    if (!user) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this email already exists. Please login using your email and password.',
        );
      }

      user = await this.prisma.user.create({
        data: {
          displayName: payload.name || payload.email.split('@')[0],
          email: payload.email,
          googleId: payload.sub,
          username: crypto.randomBytes(8).toString('hex'),
        },
      });
    }

    const { token } = await this.tokensService.createToken(user.id);

    return { token, userId: user.id };
  }
}
