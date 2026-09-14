import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const novels = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/novels",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z
    .object({
      series: z.string(),
      //index.astroのh4見出しなど、目次でのグルーピングに使う（省略可）
      chapter: z.string().optional(),
      //back/nextを連結する範囲。省略時はseriesと同じ扱い（全ページ1本の連続した話になる）
      group: z.string().optional(),
      //番外編一覧などでの短い表示名（省略時はtitleを使う）
      label: z.string().optional(),
      title: z.string(),
      description: z.string().nullish(),
    })
    //フィールド名のtypoをビルド時エラーで検出する
    .strict(),
})

export const collections = { novels }
