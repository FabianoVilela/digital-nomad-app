import React from 'react';
import type { ICategoryRepository } from '@/domain/Category';
import type { ICityRepository } from '@/domain/City';

/**
 * Repository container contract.
 * Add new repositories here as the domain grows.
 */
export interface Repositories {
  city: ICityRepository;
  category: ICategoryRepository;
}

const RepositoryContext = React.createContext<Repositories | null>(null);

export const RepositoryProvider = RepositoryContext.Provider;

export function useRepository<K extends keyof Repositories>(
  key: K,
): Repositories[K] {
  const context = React.useContext(RepositoryContext);

  if (!context) {
    throw new Error('useRepository must be used within a RepositoryProvider.');
  }

  return context[key];
}
