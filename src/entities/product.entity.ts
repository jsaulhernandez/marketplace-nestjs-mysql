import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MemorySize } from './memory-size.entity';
import { Color } from './color.entity';
import { Processor } from './processor.entity';
import { PayMethod } from './pay-method.entity';
import { CategoryModel } from './category.entity';

@Entity({ name: 'mkp_product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    description: string;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: false })
    stock: number;
    @Column({ nullable: false })
    price: number;
    @Column({ nullable: false })
    status: number;
    @Column({ nullable: false })
    detail: string;
    @Column({ nullable: false })
    specification: string;
    @ManyToMany((type) => MemorySize, { cascade: true })
    @JoinTable()
    memorySize: MemorySize[];
    @ManyToMany((type) => Color, { cascade: true })
    @JoinTable()
    color: Color[];
    @ManyToMany((type) => Processor, { cascade: true })
    @JoinTable()
    processor: Processor[];
    @ManyToMany((type) => PayMethod, { cascade: true })
    @JoinTable()
    payMethod: PayMethod[];
    @OneToOne((type) => CategoryModel, { nullable: false })
    @JoinColumn()
    category: CategoryModel;
}
