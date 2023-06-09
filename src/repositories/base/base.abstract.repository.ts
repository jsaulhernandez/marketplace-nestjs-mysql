import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async save(data: T): Promise<T> {
        return await this.entity.save(data);
    }

    public async findOne(
        conditions: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    ): Promise<T> {
        return await this.entity.findOne({
            where: conditions,
        });
    }

    public async findOneBy(
        conditions: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    ): Promise<T> {
        return await this.entity.findOneBy(conditions);
    }

    public async findByCondition(
        filterCondition: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    ): Promise<T[]> {
        return await this.entity.findBy(filterCondition);
    }

    public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
        return await this.entity.find(relations);
    }

    public async findAll(): Promise<T[]> {
        return await this.entity.find();
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.entity.delete(id);
    }
}
