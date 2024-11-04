import { Group, Team } from '../types/types';

const STORAGE_KEY = '2players-team-randomizer';

interface StorageData {
  groups: Group[];
  savedTeams: Team[];
}

export const getStorageData = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { groups: [], savedTeams: [] };
};

export const saveStorageData = (data: StorageData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}; 