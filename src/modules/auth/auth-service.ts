import { CustomError } from '#/errors/app-error.js';
import { getCredentialsByEmail } from '#modules/user';
import { PasswordHasher } from '#/infra/security/password-hasher.js';
import { AuthRepository } from './auth-repository.js';
import { AuthTokenService } from './auth-token-service.js';
import { AuthTokens, LoginParams } from './auth-types.js';

export class AuthService {
  static async login(params: LoginParams): Promise<AuthTokens> {
    const { email, password } = params;
    const user = await getCredentialsByEmail(email);
    if (!user) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }
    const isPasswordValid = await PasswordHasher.verify(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CustomError('AUTH_UNAUTHORIZED', 'Invalid email or password');
    }

    const accessToken = AuthTokenService.createAccessToken({
      userId: user.id,
    });
    const refreshToken = AuthTokenService.createRefreshToken({
      userId: user.id,
    });
    const refreshTokenHash = AuthTokenService.hashToken(refreshToken);

    await AuthRepository.replaceSession(user.id, refreshTokenHash);
    return { accessToken, refreshToken };
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { userId } = AuthTokenService.verifyRefreshToken(refreshToken);
    const currentTokenHash = AuthTokenService.hashToken(refreshToken);

    const newAccessToken = AuthTokenService.createAccessToken({ userId });
    const newRefreshToken = AuthTokenService.createRefreshToken({ userId });
    const newRefreshTokenHash = AuthTokenService.hashToken(newRefreshToken);

    // Single atomic compare-and-swap: only one request can consume a given token.
    const rotated = await AuthRepository.rotateRefreshToken(
      userId,
      currentTokenHash,
      newRefreshTokenHash,
    );

    if (!rotated) {
      throw new CustomError('SIGNED_OUT', 'Unauthorized');
    }

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  static async logout(userId: string): Promise<void> {
    await AuthRepository.deleteSession(userId);
  }
}
