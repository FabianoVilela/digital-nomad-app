export interface IRepository<T, ListItem = T, Filter = T> {
  findAll(filter?: Filter): Promise<ListItem[]>;
  findById(id: string): Promise<T>;
  findByName(name: string): Promise<T[]>;
}
