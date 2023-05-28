import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_memory-size' })
export class MemorySizeModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    value: string;
    @Column({ nullable: false })
    status: number;
}
