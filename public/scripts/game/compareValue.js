export function compareValue(input, secret) {
  const inputArr = Array.isArray(input)
    ? input.map((i) => (i ? i.toLowerCase() : ""))
    : [input ? input.toLowerCase() : ""];

  const secretArr = Array.isArray(secret)
    ? secret.map((i) => (i ? i.toLowerCase() : ""))
    : [secret ? secret.toLowerCase() : ""];

  const common = inputArr.filter((i) => secretArr.includes(i));

  if (common.length === 0) return "red";
  if (
    common.length === secretArr.length &&
    inputArr.length === secretArr.length
  )
    return "green";
  return "orange";
}
