//@deno-types="https://esm.sh/v86/@types/markdown-it@12.2.3/lib/index.d.ts"
import MarkdownIt from "markdown-it";
import markdownItSup from "https://esm.sh/markdown-it-sup@1.0.0";
import markdownItSub from "https://esm.sh/markdown-it-sub@1.0.0";
import * as gfm from "gfm";

export function mdToHtml(markdown: string) {
    return new MarkdownIt()
        .use(markdownItSup)
        .use(markdownItSub)
        .render(markdown);
}

export function mdToHtmlGf(markdown: string) {
    return gfm.render(markdown);
}
