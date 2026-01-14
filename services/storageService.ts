import { DailySpecial } from '../types';
import { DEFAULT_SPECIALS } from '../constants';

const STORAGE_KEY = 'coasters_specials_data_v1';

export const getSpecials = (): DailySpecial[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to parse specials from storage", e);
  }
  // If no data or error, save defaults and return them
  saveSpecials(DEFAULT_SPECIALS);
  return DEFAULT_SPECIALS;
};

export const saveSpecials = (specials: DailySpecial[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(specials));
};

export const updateSpecial = (updatedSpecial: DailySpecial): DailySpecial[] => {
  const current = getSpecials();
  const next = current.map(s => s.id === updatedSpecial.id ? updatedSpecial : s);
  saveSpecials(next);
  return next;
};
