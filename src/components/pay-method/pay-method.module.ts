import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PayMethodModel } from 'src/entities/pay-method.entity';

import { PayMethodController } from './controller/pay-method.controller';

import { PayMethodRepository } from './repository/implementation/pay-method.repository';
import { PayMethodService } from './service/implementation/pay-method.service';

@Module({
    imports: [TypeOrmModule.forFeature([PayMethodModel])],
    controllers: [PayMethodController],
    providers: [
        {
            provide: 'PayMethodRepositoryInterface',
            useClass: PayMethodRepository,
        },
        {
            provide: 'PayMethodServiceInterface',
            useClass: PayMethodService,
        },
    ],
})
export class PayMethodModule {}
