import { SetMetadata } from '@nestjs/common';

export const IS_MANAGER_KEY = 'Manager';

export const PermiteGerente = () => SetMetadata(IS_MANAGER_KEY, true);