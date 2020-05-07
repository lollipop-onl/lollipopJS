import { Plugin } from '@nuxt/types';
import * as C from '@/constants';
import * as utils from '@/utils';

const plugin: Plugin = (context, inject): void => {
  inject('C', C);
  inject('utils', utils);
};

export default plugin;
