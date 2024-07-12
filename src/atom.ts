import { atom } from 'recoil';
export enum themes {
  'DARK',
  'LIGHT',
}
export const themeState = atom<themes>({
  key: 'themeColor',
  default: themes.DARK,
});
