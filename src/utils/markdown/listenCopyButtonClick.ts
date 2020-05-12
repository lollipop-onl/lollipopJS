import { copy } from '@/utils';

/**
 * コピーボタンのクリックイベントをハンドリングする
 */
const listenCopyButtonClick = (): void => {
  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (!target) {
      return;
    }

    // @ts-ignore
    const copyButton: HTMLButtonElement | null = target.closest('button.copy');
    // @ts-ignore
    const codeBlock: HTMLDivElement | null = target.closest('.code-block');

    if (!copyButton || !codeBlock || copyButton.classList.contains('-copied')) {
      return;
    }

    const hljsBlock = codeBlock.querySelector('.hljs');

    if (!hljsBlock) {
      return;
    }

    const { textContent: sourceCode } = hljsBlock;

    if (!sourceCode) {
      return;
    }

    copy(sourceCode);

    copyButton.classList.add('-copied');

    setTimeout(() => {
      copyButton.classList.remove('-copied');
    }, 1000);
  });
};

export default listenCopyButtonClick;
