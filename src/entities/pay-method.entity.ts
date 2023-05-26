import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_pay_method' })
export class PayMethodModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    image: string;
    @Column({ nullable: false })
    status: number;
}
