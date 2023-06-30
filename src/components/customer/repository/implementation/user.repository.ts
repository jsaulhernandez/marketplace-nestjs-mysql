import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { UserRepositoryInterface } from '../user.repository.interface';

import { UserModel } from 'src/entities/user.entity';

@Injectable()
export class UserRepository
    extends BaseAbstractRepository<UserModel>
    implements UserRepositoryInterface
{
    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>,
    ) {
        super(userRepository);
    }
}
