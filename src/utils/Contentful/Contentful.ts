/* eslint-disable class-methods-use-this */

import {
  ContentfulClientApi, EntryCollection, Entry, createClient,
} from 'contentful';
import { ContentfulContentType } from '~/constants';
import { ContentfulEntry } from '~/types';

class Contentful {
  /** Contentful client */
  private contentfulClient: ContentfulClientApi;

  /**
   * @param space Space ID
   * @param accessToken Contentful access token
   */
  constructor(space?: string, accessToken?: string) {
    if (!space || !accessToken) {
      throw new Error('[Contentful] space_id or access_token is unspecified.');
    }

    this.contentfulClient = createClient({ space, accessToken });
  }

  /** Contentful client */
  get client() {
    return this.contentfulClient;
  }

  /**
   * Filter entries of content type ID
   */
  filterEntries<T extends ContentfulEntry>(
    contentTypeId: ContentfulContentType,
    entries: EntryCollection<any> | Entry<any>[],
  ) {
    const items = 'items' in entries ? entries.items : entries;

    return items.filter(
      (entry): entry is Entry<T> => entry.sys.contentType.sys.id === contentTypeId,
    );
  }
}

export default Contentful;
