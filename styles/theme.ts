import { DefaultTheme } from "styled-components";

const colors = {
  primary: "#6358dc",
  secondary: "#4e60ff",
  error: "#ff5c60",
  success: "#6cdb65",
  warning: "#f2d44f",
  normal: "#83859c",
  white: "#ffffff",
  lightGray: "f6f6f6",
  gray50: "#fbfbfb",
  gray100: "#edeef2",
  gray150: "#d5dbe1",
  gray200: "#c7c8d2",
  gray250: "#cfd6dc",
  gray300: "#9facb2",
  gray400: "#83859c",
  gray450: "#696c71",
  gray500: "#545563",
  gray600: "#40464c",
  black: "#2b2b43",
};

const animation = {
  default: "400ms ease-in",
  fast: "300ms ease-in",
};

const breakpoints = [
  // mobile
  "320px",
  // tablet
  "768px",
  // computer
  "992px",
  // desktop
  "1200px",
  // widescreen
  "1920px",
];

const fonts = {
  body: "Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif",
  heading: "Poppins, Helvetiva Neue, Helvetica, Aria, sans-serif",
  monospace: "Menlo, monospace",
};

const theme: DefaultTheme = {
  colors,
  animation,
  breakpoints,
  mediaQueries: {
    mobile: `@media screen and (min-width: ${breakpoints[0]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]})`,
    computer: `@media screen and (min-width: ${breakpoints[2]})`,
    desktop: `@media screen and (min-width: ${breakpoints[3]})`,
    widescreen: `@media screen and (min-width: ${breakpoints[4]})`,
  },
  shadows: {
    light: "15px 15px 35px rgba(0, 127, 255, 0.5)",
    dark: `7px 7px 15px ${colors.primary}`,
  },
  fontSizes: [
    "0.75rem",
    "0.85rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2rem",
    "2.5rem",
    "3rem",
    "4rem",
    "6rem",
  ],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700,
  },
  text: {
    header: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [4, 4, 5, 6],
      marginBottom: 3,
    },
    subheader: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [3, 3, 4, 4],
      marginBottom: 3,
    },
    h2: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [2, 3, 4, 5],
      marginBottom: 3,
    },
    h3: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [2, 2, 3, 3],
      marginBottom: 3,
    },
    h4: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [1],
      marginBottom: 3,
    },
    label: {
      fontFamily: fonts.heading,
      lineHeight: "1.25",
      fontSize: [0],
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    paragraph: {
      fontFamily: fonts.body,
      lineHeight: "1.75",
      fontSize: [1, 2],
      marginBottom: 4,
    },
    list: {
      fontFamily: fonts.body,
      lineHeight: "1.75",
      fontSize: [1, 2],
      marginBottom: 3,
    },
    display: {
      fontFamily: fonts.body,
      lineHeight: "1.5",
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
};

export default theme;

export type colorType = typeof colors;

export type variantType = "normal" | "success" | "warning" | "error";

// TODO : Notification 본격 스타일링할 떄 같이 커밋
