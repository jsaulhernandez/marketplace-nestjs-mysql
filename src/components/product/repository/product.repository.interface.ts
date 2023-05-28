import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { ProductModel } from 'src/entities/product.entity';

export interface ProductRepositoryInterface
    extends BaseInterfaceRepository<ProductModel> {}
