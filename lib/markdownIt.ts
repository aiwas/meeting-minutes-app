// // @deno-types="https://esm.sh/v86/@types/markdown-it@12.2.3/lib/index.d.ts"
import MarkdownIt from "markdown-it";

export function mdToHtml(markdown: string) {
    return new MarkdownIt().render(markdown);
}
