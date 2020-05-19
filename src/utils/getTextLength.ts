/**
 * Get length of text
 * @param text
 */
export const getTextLength = (text: string): number => {
  let count = 0;

  for (let i = text.length - 1; i >= 0; i -= 1) {
    const char = text[i];

    count += /[ -~]/.test(char) ? 0.5 : 1;
  }

  return count;
};
