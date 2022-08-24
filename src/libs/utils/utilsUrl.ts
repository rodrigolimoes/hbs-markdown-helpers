export const isUrl = (value: string) => {
  const regex = /((((https)|(http)):\/\/)|(www.))+[^\s"]+[\w]/g;
  return regex.test(value);
};
