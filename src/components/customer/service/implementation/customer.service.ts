import { Inject, Injectable } from '@nestjs/common';

import { CustomerServiceInterface } from '../customer.service.interface';
import { CustomerRepositoryInterface } from '../../repository/customer.repository.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { CustomerDTO } from 'src/dto/customer.dto';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
    constructor(
        @Inject('CustomerRepositoryInterface')
        private customerRepository: CustomerRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerDTO>> {
        return this.customerRepository.Paginate(pageOptionsDto, search);
    }
}
