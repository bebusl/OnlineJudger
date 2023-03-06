import Image from "next/image";
import {
  PYTHON2,
  PYTHON3,
  C,
  CPP,
  JAVA,
  LANGUAGES_TYPE,
} from "../utils/constants/language";

export const Python2Logo = (
  <Image
    src="https://brillbeimages.s3.ap-northeast-2.amazonaws.com/python2-logo.svg"
    alt="python icon"
    width="30px"
    height="30px"
  />
);

export const Python3Logo = (
  <Image
    src="https://brillbeimages.s3.ap-northeast-2.amazonaws.com/python3-logo.svg"
    alt="python icon"
    width="30px"
    height="30px"
  />
);

export const JavaLogo = (
  <Image
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    alt="java icon"
    width="30px"
    height="30px"
  />
);

export const CPPLogo = (
  <Image
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
    alt="cplusplus icon"
    width="30px"
    height="30px"
  />
);

export const CLogo = (
  <Image
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
    alt="c icon"
    width="30px"
    height="30px"
  />
);

export const LogoIconMapper: Record<LANGUAGES_TYPE, JSX.Element> = {
  [CPP]: CPPLogo,
  [JAVA]: JavaLogo,
  [C]: CLogo,
  [PYTHON2]: Python2Logo,
  [PYTHON3]: Python3Logo,
};
