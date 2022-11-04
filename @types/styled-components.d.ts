import "styled-components";
import theme, { colorType } from "../styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: colorType;
    animation: { [key: string]: string };
    breakpoints: string[];
    mediaQueries: {
      mobile: string;
      tablet: string;
      computer: string;
      desktop: string;
      widescreen: string;
    };
    shadows: {
      light: string;
      dark: string;
    };
    fontSizes: string[];
    fontWeights: { body: number; heading: number; bold: number };
    text: { [key: string]: unknown };
  }
}
