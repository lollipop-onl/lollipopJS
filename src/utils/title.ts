import { SITE_TITLE } from '~/constants';
import { getTextLength } from '~/utils/getTextLength';

/**
 * Get page title
 * @param title
 */
export const getTitle = (title?: string | null): string => {
  if (!title) {
    return SITE_TITLE;
  }

  const separator = ' - ';
  const titleLength = getTextLength(title);
  const siteTitleLength = getTextLength(SITE_TITLE);
  const separatorLength = getTextLength(separator);
  const maxTitleLength = 32 - siteTitleLength - separatorLength;
  const ellipsisedTitle = titleLength <= maxTitleLength ? title : `${title.slice(0, maxTitleLength - 2)}…`;

  return [ellipsisedTitle, separator, SITE_TITLE].join('');
};
