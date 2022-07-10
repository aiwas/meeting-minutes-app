/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Article, getArticle } from "@/lib/contents.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { apply, tw } from "@twind";
import { css } from "twind/css";

/**
 * 本文のスタイル
 */
const typography = css({
  h2: apply`mb-2 text-2xl font-bold`,
  h3: apply`mb-1 text-xl font-bold`,
  li: apply`list-disc ml-6`,
  p: apply`my-2`,
}, {
  "p::first-letter": apply`pl-[1rem]`,
});

export const handler: Handlers<Article> = {
  GET: async (_req, ctx) => {
    const data = await getArticle(decodeURI(ctx.params.filename));
    return ctx.render(data);
  },
};

export default function Page({ data }: PageProps<Article>) {
  return (
    <div class={tw`max-w-[1024px] p-4 mx-auto`}>
      <Head>
        <title>{data.title} | 議事録</title>
      </Head>
      <h1 class={tw`mb-4 text-4xl font-bold text-center`}>{data.title}</h1>
      <div class={tw`mb-4 p-4 bg-white rounded`}>
        <table
          class={tw`w-full table-auto`}
          // style={{ borderSpacing: "2px", borderCollapse: "separate" }}
        >
          <tr>
            <th class={tw`p-2 text-left`}>日時</th>
            <td>{data.date} {data.begin}～{data.end}</td>
          </tr>
          <tr>
            <th class={tw`p-2 text-left`}>参加者</th>
            <td>{data.attendees.join(" ")}</td>
          </tr>
          <tr>
            <th class={tw`p-2 text-left`}>書記</th>
            <td>{data.clerical}</td>
          </tr>
          <tr>
            <th class={tw`p-2 text-left`}>最終更新</th>
            <td>{data.lastUpdate}</td>
          </tr>
        </table>
      </div>

      {
        /* <dl>
        <dt>日時</dt>
        <dd>{data.title}</dd>
        <dt>参加者</dt>
        <dd>{data.attendees.join(" ")}</dd>
      </dl> */
      }

      <main
        class={tw`p-4 bg-white rounded ${typography}`}
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
      <hr class={tw`p-2`} />
      <footer class={tw`flex`}>
        <a
          href="/"
          class={tw
            `w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded`}
        >
          Back
        </a>
      </footer>
    </div>
  );
}
