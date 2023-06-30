import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { UserModel } from 'src/entities/user.entity';

export interface UserRepositoryInterface extends BaseInterfaceRepository<UserModel> {}
