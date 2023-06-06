import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MemorySizeModel } from './memory-size.entity';
import { ColorModel } from './color.entity';
import { ProcessorModel } from './processor.entity';
import { PayMethodModel } from './pay-method.entity';
import { CategoryModel } from './category.entity';

@Entity({ name: 'mkp_product' })
export class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: false })
    stock: number;
    @Column({ nullable: false })
    price: number;
    @Column({ nullable: false })
    status: number;
    @Column({ nullable: false })
    detail: string;
    @Column({ nullable: false })
    specification: string;
    @ManyToMany((type) => MemorySizeModel, { cascade: true })
    @JoinTable()
    memorySize: MemorySizeModel[];
    @ManyToMany((type) => ColorModel, { cascade: true })
    @JoinTable()
    color: ColorModel[];
    @ManyToMany((type) => ProcessorModel, { cascade: true })
    @JoinTable()
    processor: ProcessorModel[];
    @ManyToMany((type) => PayMethodModel, { cascade: true })
    @JoinTable()
    payMethod: PayMethodModel[];
    @ManyToOne((type) => CategoryModel, { nullable: false })
    @JoinColumn()
    category: CategoryModel;
}
