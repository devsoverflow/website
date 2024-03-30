import type { ProgLang } from '@/configs/prog_langs';
import { atom,map } from 'nanostores';

export const plogos = map<Record<string, ProgLang>>({});

export const plogos_found = atom(new Set<string>());
