import { Inject, Injectable } from '@nestjs/common';

import { CustomerServiceInterface } from '../customer.service.interface';
import { CustomerRepositoryInterface } from '../../repository/customer.repository.interface';
import { UserRepositoryInterface } from '../../repository/user.repository.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { CustomerDTO } from 'src/dto/customer.dto';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
    constructor(
        @Inject('CustomerRepositoryInterface')
        private customerRepository: CustomerRepositoryInterface,
        @Inject('UserRepositoryInterface')
        private userRepository: UserRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerDTO>> {
        return this.customerRepository.Paginate(pageOptionsDto, search);
    }

    async existDocument(document: string): Promise<boolean> {
        try {
            const result = await this.customerRepository.findOneBy({
                document,
            });

            if (!result) return false;

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    /*
     * Method's for users
     */
    async existEmail(email: string): Promise<boolean> {
        try {
            const result = await this.userRepository.findOneBy({
                email,
            });

            if (!result) return false;

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
