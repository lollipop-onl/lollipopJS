import { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import hljs from 'highlight.js';
import parseLanguage from '@/utils/markdown/getLanguage';
import { copy } from '@/utils/copy';

let codeBlockIndex = 0;

const wrap = (render?: RenderRule): RenderRule | undefined => {
  if (!render) {
    return render;
  }

  return function (this: any, ...args) {
    return render
      .apply(this, args)
      .replace(/<code +class="/g, '<code class="code-block ')
      .replace(/<code>/g, '<code class="code-block">');
  };
};

const highlight: PluginSimple = (md) => {
  md.options.highlight = (str, lang) => {
    const { language, displayName, isFileName } = parseLanguage(lang);
    let source = md.utils.escapeHtml(str);

    codeBlockIndex++;

    if (language) {
      source = hljs.highlight(language, str).value;
    }

    if (displayName) {
      const isConsole = ['Shell Session', 'Bash'].includes(displayName);
      const iconName = isFileName
        ? 'fa-file-code'
        : isConsole
        ? 'fa-terminal'
        : 'fa-code';

      source = `<span class="code-block-header"><span class="name"><span class="fas ${iconName} icon"></span>${displayName}</span><button class="copy"><span class="fas fa-copy"></span></button></span><span class="hljs">${source}</span>`;
    }

    return source;
  };

  md.renderer.rules.fence = wrap(md.renderer.rules.fence);
  md.renderer.rules.code_block = wrap(md.renderer.rules.code_block);

  if (process.client) {
    document.body.addEventListener('click', (e) => {
      const { target } = e;

      if (!target) {
        return;
      }

      // @ts-ignore
      const copyButton: HTMLButtonElement | null = target.closest(
        'button.copy'
      );
      // @ts-ignore
      const codeBlock: HTMLDivElement | null = target.closest('.code-block');

      if (
        !copyButton ||
        !codeBlock ||
        copyButton.classList.contains('-copied')
      ) {
        return;
      }

      const hljsBlock = codeBlock.querySelector('.hljs');

      if (!hljsBlock) {
        return;
      }

      copy(hljsBlock.textContent);

      copyButton.classList.add('-copied');

      setTimeout(() => {
        copyButton.classList.remove('-copied');
      }, 1000);
    });
  }
};

export default highlight;
