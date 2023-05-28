import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mkp_color' })
export class ColorModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    value: string;
    @Column({ nullable: false })
    status: number;
}
