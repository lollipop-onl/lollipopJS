import { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import hljs from 'highlight.js';
import parseLanguage from './parseLanguage';

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

    if (language) {
      source = hljs.highlight(language, str).value;
    }

    const isPlainText = displayName === 'Plain Text';
    const isConsole = ['Shell Session', 'Bash'].includes(displayName);
    const iconName = isFileName
      ? 'fa-file-code'
      : isConsole
        ? 'fa-terminal'
        : isPlainText
          ? 'fa-pen-nib'
          : 'fa-code';

    return `<span class="code-block-header"><span class="name"><span class="fas ${iconName} icon"></span>${displayName}</span><button class="copy"><span class="fas fa-copy"></span></button></span><span class="hljs">${source}</span>`;
  };

  md.renderer.rules.fence = wrap(md.renderer.rules.fence);
  md.renderer.rules.code_block = wrap(md.renderer.rules.code_block);
};

export default highlight;
