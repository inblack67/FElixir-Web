import { atom } from 'recoil';
import { GET_ME_ATOM_KEY } from './constants';
import { ICurrentUser } from './interfaces';

export const getMeAtom = atom<ICurrentUser | null>({
  key: GET_ME_ATOM_KEY,
  default: null,
});
