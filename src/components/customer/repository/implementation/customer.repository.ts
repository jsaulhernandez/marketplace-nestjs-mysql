import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { CustomerRepositoryInterface } from '../customer.repository.interface';

import { CustomerModel } from 'src/entities/customer.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

@Injectable()
export class CustomerRepository
    extends BaseAbstractRepository<CustomerModel>
    implements CustomerRepositoryInterface
{
    constructor(
        @InjectRepository(CustomerModel)
        private customerRepository: Repository<CustomerModel>,
    ) {
        super(customerRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerModel>> {
        const [entities, itemCount] = await this.customerRepository.findAndCount({
            where: [
                {
                    firstName: Like(`%${search}%`),
                },
                {
                    firstLastName: Like(`%${search}%`),
                },
                {
                    document: Like(`%${search}%`),
                },
                {
                    user: {
                        email: Like(`%${search}%`),
                    },
                },
            ],
            order: { id: pageOptionsDto.order },
            relations: {
                typeDocument: true,
                user: true,
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
