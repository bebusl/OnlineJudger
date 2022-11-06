export type regexType = "email" | "password" | "id" | string;

const regexPatterns: Record<regexType, RegExp> = {
  email: new RegExp("[a-zA-Z0-9]+([-_.][a-zA-Z0-9]*)*@[a-zA-Z]{3,}.[a-z]{2,4}"),
  password: new RegExp(
    "(^.*(?=^.{8,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$)|[a-zA-Z0-9]{6,10}"
  ),
  id: new RegExp("[가-힣a-zA-Z0-9]{6,12}"),
};

const validator = (type: regexType, value: string) => {
  const regex = regexPatterns[type];
  const result = regex.test(value);
  return result;
};

export default validator;
