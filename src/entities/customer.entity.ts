import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TypeDocumentModel } from './type-document.entity';

@Entity({ name: 'mkp_customer' })
export class CustomerModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    firstName: string;
    @Column({ nullable: true })
    secondName: string;
    @Column({ nullable: false })
    firstLastName: string;
    @Column({ nullable: true })
    secondLastName: string;
    @Column({ nullable: false })
    dateBirth: string;
    @ManyToOne((type) => TypeDocumentModel, { nullable: false })
    @JoinColumn()
    typeDocument: TypeDocumentModel;
    @Column({ nullable: true })
    document: string;
    @Column({ nullable: true })
    phone: string;
    @Column({ nullable: false })
    terms: number;
}
