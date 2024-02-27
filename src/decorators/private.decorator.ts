import { SetMetadata } from '@nestjs/common';

export const Private = (user: string) => SetMetadata('user', user);
