import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import ParserBlock from 'markdown-it/lib/parser_block';

const jsfiddleRuler: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const posMax = state.eMarks[startLine];
  const line = state.src.slice(pos, posMax);
  const jsfiddleUrl = /^(?:https?:)?\/\/jsfiddle\.net\/[^/]+\/[^/]+\/?(?:[0-9]+)?/.exec(line);

  if (!jsfiddleUrl || pos >= posMax) {
    return false;
  }

  const url = jsfiddleUrl[0];

  if (!silent) {
    state.line = startLine + 1;

    const token = state.push('jsfiddle', '', 0);

    token.content = [url, 'embed/js,html,css,result/dark'].join('/');
  }

  return true;
};

const jsfiddleTokenizer = (md: MarkdownIt): RenderRule => (tokens, index) => {
  const { content } = tokens[index];
  const url = md.utils.escapeHtml(content);

  return `<div class="jsfiddleEmbed"><script async src="${url}"></script></div>`;
};

const jsfiddlePlugin: PluginSimple = (md) => {
  md.renderer.rules.jsfiddle = jsfiddleTokenizer(md);
  md.block.ruler.before('paragraph', 'jsfiddle', jsfiddleRuler);
};

export default jsfiddlePlugin;
