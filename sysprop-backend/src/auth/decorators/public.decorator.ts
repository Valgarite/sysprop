import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'Publica';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);