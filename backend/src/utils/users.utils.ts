import * as crypto from 'crypto';

export function hashPasswordToSha256(password: string): string {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  return hashedPassword;
}
