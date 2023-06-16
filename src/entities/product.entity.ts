import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import {
    DecimalToString,
    DecimalTransformer,
} from 'src/common/interceptors/decimals/decimal-transformer.interceptor';

import { MemorySizeModel } from './memory-size.entity';
import { ColorModel } from './color.entity';
import { ProcessorModel } from './processor.entity';
import { PaymentMethodModel } from './payment-method.entity';
import { CategoryModel } from './category.entity';
import { Transform } from 'class-transformer';

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
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.0,
        transformer: new DecimalTransformer(),
    })
    //@Transform(DecimalToString(), { toPlainOnly: true })
    price: number;
    @Column({ nullable: false })
    status: number;
    @Column({ nullable: false, length: 3000 })
    detail: string;
    @Column({ nullable: false, length: 3000 })
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
    @ManyToMany((type) => PaymentMethodModel, { cascade: true })
    @JoinTable()
    payMethod: PaymentMethodModel[];
    @ManyToOne((type) => CategoryModel, { nullable: false })
    @JoinColumn()
    category: CategoryModel;
}
