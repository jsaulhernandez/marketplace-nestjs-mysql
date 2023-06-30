import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerModel } from 'src/entities/customer.entity';
import { UserModel } from 'src/entities/user.entity';

import { CustomerController } from './controller/customer.controller';
import { CustomerRepository } from './repository/implementation/customer.repository';
import { UserRepository } from './repository/implementation/user.repository';
import { CustomerService } from './service/implementation/customer.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerModel, UserModel])],
    controllers: [CustomerController],
    providers: [
        {
            provide: 'CustomerRepositoryInterface',
            useClass: CustomerRepository,
        },
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        {
            provide: 'CustomerServiceInterface',
            useClass: CustomerService,
        },
    ],
})
export class CustomerModule {}
