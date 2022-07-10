/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { ArticleSummary, getAllArticles } from "@/lib/contents.ts";

// カスタムハンドラを定義する。
// 以下ではGETアクセスした際にベタ書きデータを持った状態でレンダリングされるようにしている。
export const handler: Handlers<ArticleSummary[]> = {
  GET: async (_req, ctx) => {
    const dataList = await getAllArticles();
    return ctx.render(dataList);
  },
};

export default function Index({ data }: PageProps<ArticleSummary[]>) {
  return (
    <div class={tw`p-4`}>
      <Head>
        <title>議事録</title>
      </Head>
      <header class={tw`sticky top-0`}>
        <h1 class={tw`mb-4 text-4xl font-bold text-center`}>議事録一覧</h1>
      </header>
      <main class={tw`max-w-[1024px] mx-auto`}>
        <ul class={tw``}>
          {data.map((summary) => (
            <li
              key={summary.filename}
              class={tw`flex flex-col gap-2 mx-auto my-2 p-4 bg-white shadow rounded`}
            >
              <a
                href={`articles/${summary.filename}`}
                class={tw`text-gray-700 hover:underline`}
              >
                <h3 class={tw`text-2xl font-bold`}>{summary.title}</h3>
              </a>
              <div class={tw`flex flex-row gap-2 text-gray-500`}>
                <time dateTime={summary.date}>{summary.date}</time>
                <span>{summary.begin}</span>
                {/* <span class={tw`px-2 bg-gray-200 text-black`}>tag</span> */}
              </div>
              {/* TODO: 議事録のタイプを表示する（定例、単発） */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
