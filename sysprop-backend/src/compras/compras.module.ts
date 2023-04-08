import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';

@Module({
  providers: [ComprasService],
  controllers: [ComprasController]
})
export class ComprasModule {}
