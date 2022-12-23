export const C = "C";
export const CPP = "CPP";
export const PYTHON2 = "PYTHON2";
export const PYTHON3 = "PYTHON3";
export const JAVA = "JAVA";

export const LANGUAGES = [C, CPP, PYTHON2, PYTHON3, JAVA];

export type LANGUAGES_TYPE =
  | typeof C
  | typeof CPP
  | typeof PYTHON2
  | typeof PYTHON3
  | typeof JAVA;
