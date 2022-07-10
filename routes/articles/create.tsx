/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  title: string;
  body: string;
}

// export const handler: Handlers<Data> = {
//   POST: async (req, _ctx) => {
//     const formData = await req.formData();
//     const title = formData.get("title")?.toString();
//     const content = formData.get("content")?.toString();
//     if (!title || !content) {

//     }
//     // TODO: 実装する
//   },
// };

export default function Page({ data }: PageProps<Data>) {
  return (
    <div class={tw`max-w-[1024px] p-4 mx-auto`}>
      <h1 class={tw`mb-4 text-4xl font-bold text-center`}>議事録を作成する</h1>
      <main class={tw`max-w-[1024px] mx-auto`}>
        <form method="post">
          <ul>
            <li class={tw`pb-4`}>
              <label htmlFor="title" class={tw`block font-bold`}>題名</label>
              <input
                type="text"
                name="title"
                class={tw`w-full p-2 border rounded`}
              />
            </li>
            <li class={tw`pb-4`}>
              <label htmlFor="body" class={tw`block font-bold`}>議事</label>
              <textarea
                name="body"
                class={tw`w-full h-[50vh] p-2 border rounded`}
              />
            </li>
            <li class={tw`pb-4`}>
              <button
                type="submit"
                class={tw
                  `w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded`}
              >
                作成
              </button>
            </li>
          </ul>
        </form>
      </main>
      <footer class={tw`flex`}>
        <a
          href="/"
          class={tw
            `w-full text-center px-4 py-2 bg-white hover:bg-blue-100 border border-blue-600 rounded`}
        >
          取消
        </a>
      </footer>
    </div>
  );
}
