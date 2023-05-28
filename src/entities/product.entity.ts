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
    @ManyToMany((type) => MemorySize)
    @JoinTable()
    memorySize: MemorySize[];
    @ManyToMany((type) => Color)
    @JoinTable()
    color: Color[];
    @ManyToMany((type) => Processor)
    @JoinTable()
    processor: Processor[];
    @ManyToMany((type) => PayMethod)
    @JoinTable()
    payMethod: PayMethod[];
    @OneToOne((type) => CategoryModel, { nullable: false })
    @JoinColumn()
    category: CategoryModel;
}
