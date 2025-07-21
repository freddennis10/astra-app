import 'styled-components';
import { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    createShadow: (elevation: number, theme: Theme) => string;
  }
}
