import { SITE_TITLE } from '~/constants';

/**
 * Get page title
 * @param title
 */
export const getTitle = (title?: string | null): string => {
  if (!title) {
    return SITE_TITLE;
  }

  const separator = ' - ';

  return [title, separator, SITE_TITLE].join('');
};
