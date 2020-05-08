import { Context } from '@nuxt/types';
import {
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { Entry } from 'contentful';
import { ContentfulEntry } from '@/types';

export interface IState {
  /** Contentfulから取得したエントリ */
  contentfulEntries: Entry<ContentfulEntry>[];
}
export const state = (): IState => ({
  contentfulEntries: [],
});

export const getters = {};

export const mutations = {
  /** Contentfulのエントリを追加する */
  addContentfulEntries(state: IState, entries: Entry<ContentfulEntry>[]): void {
    state.contentfulEntries = state.contentfulEntries.concat(entries);
  },
};

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;

export const actions = {
  /** Nuxtのサーバーサイドで実行されるフック */
  async nuxtServerInit({ commit }: Ctx, { app }: Context): Promise<void> {
    const entries = await app.$contentful.fetchAllEntries();

    commit('addContentfulEntries', entries);
  },
};

export type Store = DefineStoreModule<
  '',
  IState,
  typeof getters,
  typeof mutations,
  Omit<typeof actions, 'nuxtServerInit'>
>;
