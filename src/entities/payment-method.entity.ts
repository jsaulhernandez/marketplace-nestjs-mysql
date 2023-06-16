import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_payment_method' })
export class PaymentMethodModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: false })
    status: number;
}
