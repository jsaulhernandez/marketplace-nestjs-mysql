import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerModel } from './customer.entity';
import { UserStatus } from './enums/enums';

@Entity({ name: 'mkp_user' })
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    email: string;
    @Column({ nullable: false })
    password: string;
    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
        nullable: false,
    })
    status: UserStatus;
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
