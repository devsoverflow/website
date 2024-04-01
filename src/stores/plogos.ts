import type { ProgLang } from '@/configs/prog_langs';
import { map } from 'nanostores';

export const plogos = map<Record<string, ProgLang>>({});

export const plogos_found = map<Record<string, number>>({});
