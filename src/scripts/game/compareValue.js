export function compareValue(input, secret) {
  const normalize = (val) => {
    if (!val) return [""];
    if (Array.isArray(val))
      return val.map((v) => (v ? v.toString().trim().toLowerCase() : ""));
    return [val.toString().trim().toLowerCase()];
  };

  const inputArr = normalize(input);
  const secretArr = normalize(secret);

  const common = inputArr.filter((i) => secretArr.includes(i));

  if (common.length === 0) return "red";
  if (
    common.length === secretArr.length &&
    inputArr.length === secretArr.length
  )
    return "green";
  return "orange";
}
