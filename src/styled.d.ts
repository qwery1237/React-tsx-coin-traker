import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    bgContainer: string;
    accentColor: string;
    accentColorNegative: string;
  }
}
