export function trimDescription(text) {
    const stg = String(text)
  const maxLength = 153;
  if (stg.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}
