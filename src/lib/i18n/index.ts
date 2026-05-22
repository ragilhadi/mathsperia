import { en } from './en';
import { id } from './id';

export const translations = { en, id } as const;

export type Translations = typeof translations;
export type Lang = keyof Translations;
