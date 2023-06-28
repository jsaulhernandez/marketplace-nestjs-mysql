import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerModel } from './customer.entity';

@Entity({ name: 'mkp_user' })
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    email: string;
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: false })
    status: number;
    @Column({ nullable: false })
    createdAt: number;
    @Column({ nullable: false })
    updatedAt: number;
    @Column({ nullable: true })
    verifiedEmail: number;
    @ManyToOne((type) => CustomerModel, { nullable: false })
    @JoinColumn()
    customer: CustomerModel;
}
