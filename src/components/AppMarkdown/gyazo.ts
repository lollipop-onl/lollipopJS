import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import ParserBlock from 'markdown-it/lib/parser_block';

const gyazoRuler: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const posMax = state.eMarks[startLine];
  const line = state.src.slice(pos, posMax);
  const gyazoUrl = /^(?:https?:)?\/\/(?:i\.)?gyazo\.com\/([a-z0-9]+)(?:\.[a-z0-9])?/.exec(line);

  console.log(gyazoUrl);

  if (!gyazoUrl || pos >= posMax) {
    return false;
  }

  const id = gyazoUrl[1];

  if (!silent) {
    state.line = startLine + 1;

    const token = state.push('gyazo', '', 0);

    token.content = id;
  }

  return true;
};

const gyazoTokenizer = (md: MarkdownIt): RenderRule => (tokens, index) => {
  const { content } = tokens[index];
  const src = md.utils.escapeHtml(`https://i.gyazo.com/${content}.png`);

  return `<p><img src="${src}" alt="Image from Gyazo" loading="lazy" /></p>`;
};

const gyazoPlugin: PluginSimple = (md) => {
  md.renderer.rules.gyazo = gyazoTokenizer(md);
  md.block.ruler.before('paragraph', 'gyazo', gyazoRuler);
};

export default gyazoPlugin;
