import markdownIt from 'markdown-it';
// @ts-ignore
import externalLinks from 'markdown-it-external-links';
import highlight from './highlight';
import youtube from './youtube';
import jsfiddle from './jsfiddle';

const md = markdownIt({
  breaks: true,
});

md.use(youtube);
md.use(jsfiddle);

// 外部リンクのプラグインを登録する
md.use(externalLinks, {
  externalClassName: '-external',
  internalClassName: '-internal',
  internalDomains: [],
  externalTarget: '_blank',
  internalTarget: '_blank',
  externalRel: 'noopener noreferrer',
  internalRel: 'noopener noreferrer',
});

// シンタクスハイライトのプラグインを登録する
md.use(highlight);

/**
 * MarkdownをHTMLにパースする
 * @param source
 */
const markdown = (source: string): string => md.render(source);

export default markdown;
