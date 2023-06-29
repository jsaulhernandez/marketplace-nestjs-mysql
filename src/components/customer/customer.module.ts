import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerModel } from 'src/entities/customer.entity';

import { CustomerController } from './controller/customer.controller';
import { CustomerRepository } from './repository/implementation/customer.repository';
import { CustomerService } from './service/implementation/customer.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerModel])],
    controllers: [CustomerController],
    providers: [
        {
            provide: 'CustomerRepositoryInterface',
            useClass: CustomerRepository,
        },
        {
            provide: 'CustomerServiceInterface',
            useClass: CustomerService,
        },
    ],
})
export class CustomerModule {}
