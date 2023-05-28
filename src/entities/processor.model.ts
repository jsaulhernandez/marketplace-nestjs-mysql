import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_processor' })
export class Processor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    status: number;
}
