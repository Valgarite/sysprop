import { SetMetadata } from '@nestjs/common';

export const IS_EMPLEADO_KEY = 'Employee';

export const PermiteEmpleado = () => SetMetadata(IS_EMPLEADO_KEY, true);