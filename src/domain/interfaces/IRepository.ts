export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByName(name: string): Promise<T[]>;
}
