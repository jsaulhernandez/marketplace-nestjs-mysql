import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductModel } from './product.entity';
import { ColorModel } from './color.entity';
import { MemorySizeModel } from './memory-size.entity';
import { ProcessorModel } from './processor.entity';
import { SaleHeaderModel } from './sale-header.entity';

import { DecimalTransformer } from 'src/common/interceptors/decimals/decimal-transformer.interceptor';

@Entity({ name: 'mkp_sale_detail' })
export class SaleDetailModel {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne((type) => ProductModel, { nullable: false })
    @JoinColumn()
    product: ProductModel;
    @ManyToOne((type) => ColorModel, { nullable: false })
    @JoinColumn()
    color: ColorModel;
    @ManyToOne((type) => ProcessorModel, { nullable: false })
    @JoinColumn()
    processor: ProcessorModel;
    @ManyToOne((type) => MemorySizeModel, { nullable: false })
    @JoinColumn()
    memorySize: MemorySizeModel;
    @Column({ nullable: false })
    quantity: number;
    @Column({
        nullable: false,
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.0,
        transformer: new DecimalTransformer(),
    })
    price: number;
    @Column({ nullable: true })
    note: string;
    @ManyToOne((type) => SaleHeaderModel, (header) => header.detail, { nullable: false })
    @JoinColumn()
    saleHeader: SaleHeaderModel;
}
