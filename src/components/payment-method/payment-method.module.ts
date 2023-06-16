import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentMethodModel } from 'src/entities/payment-method.entity';

import { PaymentMethodController } from './controller/payment-method.controller';

import { PaymentMethodRepository } from './repository/implementation/pay-method.repository';
import { PaymentMethodService } from './service/implementation/payment-method.service';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentMethodModel])],
    controllers: [PaymentMethodController],
    providers: [
        {
            provide: 'PaymentMethodRepositoryInterface',
            useClass: PaymentMethodRepository,
        },
        {
            provide: 'PaymentMethodServiceInterface',
            useClass: PaymentMethodService,
        },
    ],
})
export class PaymentMethodModule {}
