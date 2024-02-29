import { SetMetadata } from '@nestjs/common';

export const Private = (accountType: 'user') =>
  SetMetadata('user', accountType);
