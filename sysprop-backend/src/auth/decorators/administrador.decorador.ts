import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'Admin';

export const PermiteAdmin = () => SetMetadata(IS_ADMIN_KEY, true);