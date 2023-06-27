import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PaymentMethodModel } from './payment-method.entity';
import { SaleDetailModel } from './sale-detail.entity';

@Entity({ name: 'mkp_sale_header' })
export class SaleHeaderModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    shippingCost: number;
    @Column({ nullable: false })
    tax: number;
    @ManyToOne((type) => PaymentMethodModel, { nullable: false })
    @JoinColumn()
    paymentMethod: PaymentMethodModel;
    @Column({ nullable: false })
    user: string;
    @OneToMany((type) => SaleDetailModel, (detail) => detail.saleHeader)
    detail: SaleDetailModel[];
}
