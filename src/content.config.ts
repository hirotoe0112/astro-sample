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
      // 作品名を除いたページ名
      title: z.string(),
    })
    // フィールド名のtypoをビルド時エラーで検出する
    .strict(),
})

export const collections = { novels }
