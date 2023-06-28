import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_type_document' })
export class TypeDocumentModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    masking: string;
    @Column({ nullable: false })
    status: number;
}
