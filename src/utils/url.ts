/**
 * URLのパスパラメータを置換する
 * @param originalUrl URL
 * @param pathParameters パスパラメータ
 */
export const url = (
  originalUrl: string,
  pathParameters: Record<string, string | number | undefined>
): string => {
  return originalUrl
    .split('/')
    .map((chunk) => {
      return chunk.replace(/^(_)(.+)/, (match, p1, p2) => {
        const parameter = pathParameters[p2];

        if (!parameter) {
          return '';
        }

        return parameter.toString() || '';
      });
    })
    .join('/');
};
