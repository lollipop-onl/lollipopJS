import { Route } from 'vue-router';

type QueryValue = string | null;

/**
 * クエリのキーから値を取得する
 * @param query クエリのオブジェクト
 * @param key 取得するキー
 * @param isList リストとして返すか
 */
export function qv(
  query: Route['query'],
  key: string,
  isList?: false
): QueryValue | undefined;
export function qv(
  query: Route['query'],
  key: string,
  isList: true
): QueryValue[];
export function qv(query: Route['query'], key: string, isList?: boolean): any {
  const value = query[key];

  if (!value) {
    return isList ? [] : null;
  }

  const values = Array.isArray(value) ? value : [value];

  return isList ? values : values[0];
}
