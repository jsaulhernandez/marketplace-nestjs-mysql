import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_pay_method' })
export class PayMethod {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: false })
    status: number;
}
