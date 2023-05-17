import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    save(data: T | any): Promise<T>;

    findOneById(id: number): Promise<T>;

    findByCondition(filterCondition: any): Promise<T[]>;

    findAll(): Promise<T[]>;

    delete(id: number): Promise<DeleteResult>;

    findWithRelations(relations: any): Promise<T[]>;
}
