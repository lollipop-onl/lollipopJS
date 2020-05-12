/**
 * テキストをコピーする
 * @param text コピーするテキスト
 */
export const copy = (text: string | number): boolean => {
  try {
    // コピー用のテキストエリアを生成する
    let textarea: HTMLTextAreaElement | null = document.createElement('textarea');
    // テキストエリアの中身にコピーするテキストを設定する
    textarea.textContent = `${text}`;
    // body要素の最後にテキストエリアを追加する
    document.body.appendChild(textarea);
    // テキストエリアを選択する
    textarea.select();
    // コピーコマンドを実行
    document.execCommand('copy');
    // コピー用のテキストエリアを削除
    document.body.removeChild(textarea);
    // テキストエリアの変数を開放する
    textarea = null;

    return true;
  } catch (err) {
    return false;
  }
};
