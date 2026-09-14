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
      // 目次でのグルーピング
      chapter: z.string().optional(),
      // back/nextで行き来できる範囲
      // 省略時は全ページがback/nextで行き来できる
      group: z.string().optional(),
      // 番外編の表示名
      label: z.string().optional(),
      title: z.string(),
      description: z.string().nullish(),
    })
    //フィールド名のtypoをビルド時エラーで検出する
    .strict(),
})

export const collections = { novels }
