import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModel } from 'src/entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from 'src/components/category/repository/implementation/category.repository';
import { CategoryService } from './services/implementation/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryModel])],
    controllers: [CategoryController],
    providers: [
        {
            provide: 'CategoryRepositoryInterface',
            useClass: CategoryRepository,
        },
        {
            provide: 'CategoryServiceInterface',
            useClass: CategoryService,
        },
    ],
})
export class CategoryModule {}
