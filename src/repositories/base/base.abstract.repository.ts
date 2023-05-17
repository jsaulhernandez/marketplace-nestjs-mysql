import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async save(data: T | any): Promise<T> {
        return await this.entity.save(data);
    }

    public async findOneById(id: number): Promise<T> {
        return await this.entity.findOneBy({ id: id } as unknown as FindOptionsWhere<T>);
    }

    public async findByCondition(filterCondition: any): Promise<T[]> {
        return await this.entity.findBy(filterCondition);
    }

    public async findWithRelations(relations: any): Promise<T[]> {
        return await this.entity.find(relations);
    }

    public async findAll(): Promise<T[]> {
        return await this.entity.find();
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.entity.delete(id);
    }
}
