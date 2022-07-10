import * as path from "std/path/mod.ts";
import mattter from "gray-matter";
import * as dateFns from "date-fns";
import { ja } from "date-fns/locale";
import { mdToHtml } from "@/lib/markdownIt.ts";

/**
 * 記事
 */
export interface Article {
    /** タイトル */
    title: string;
    /** 開催日付 */
    date: string;
    /** 開始時間 */
    begin: string;
    /** 終了時間 */
    end: string;
    /** 書記 */
    clerical: string;
    /** 分類 */
    type: string;
    /** 参加者 */
    attendees: string[];
    /** 本文 */
    body: string;

    /** ファイル名 */
    filename: string;
    /** 最終更新日時 */
    lastUpdate: string;
}

/**
 * 記事概要
 */
export type ArticleSummary = Pick<Article, "filename" | "title" | "date" | "begin" | "end">;
// export interface ArticleSummary {
//     filename: string;
//     title: string;
//     datetime: string;
// }

const contentsDir = "contents";
const contentExt = ".md";

/**
 * 記事概要の一覧を取得します。
 * @returns 記事概要リスト
 */
export async function getAllArticles(): Promise<ArticleSummary[]> {
    const contentsDirPath = path.join(Deno.cwd(), contentsDir);

    const summaryList: ArticleSummary[] = [];
    for await (const entry of Deno.readDir(contentsDirPath)) {
        if (entry.isFile && path.extname(entry.name) === contentExt) {
            const filePath = path.join(contentsDirPath, entry.name);
            // FrontMatterを処理
            const { data: meta } = mattter(await Deno.readTextFile(filePath));
            // 一覧表示用に最低限の情報だけ取得する
            summaryList.push({
                filename: entry.name.substring(entry.name.length - contentExt.length, 0),
                title: meta["title"] as string ?? "",
                date: dateFns.format(new Date(meta["date"] ?? 0), "yyyy/MM/dd"),
                begin: meta["begin"] as string ?? "",
                end: meta["end"] as string ?? "",
            });
        }
    }

    return summaryList;
}

/**
 * 記事データを取得します。
 * @param filename 記事ファイル名
 * @returns 記事データ
 */
export async function getArticle(filename: string): Promise<Article> {
    const filePath = path.join(Deno.cwd(), contentsDir, filename + contentExt);
    const { data: meta, content: body } = mattter(await Deno.readTextFile(filePath));

    return {
        filename: filename,
        title: meta["title"] as string ?? "",
        date: dateFns.format(new Date(meta["date"] ?? 0), "yyyy年MM月dd日（EEE）", { locale: ja }),
        type: meta["type"] ?? "",
        begin: meta["begin"] ?? "",
        end: meta["end"] ?? "",
        clerical: meta["clerical"] ?? "",
        attendees: meta["attendees"],
        body: mdToHtml(body),
        lastUpdate: dateFns.format((await Deno.stat(filePath)).mtime!, "yyy/MM/dd HH:mm:ss"),
    } as Article;
}