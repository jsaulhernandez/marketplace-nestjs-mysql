import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    save(data: T | any): Promise<T>;

    findOne(conditions: any): Promise<T>;

    findOneBy(conditions: any): Promise<T>;

    findByCondition(filterCondition: any): Promise<T[]>;

    findAll(): Promise<T[]>;

    delete(id: number): Promise<DeleteResult>;

    findWithRelations(relations: any): Promise<T[]>;
}
