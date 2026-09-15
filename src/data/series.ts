// 作品ごとの情報
export const seriesInfo: Record<
  string,
  {
    title: string
    // この中に入っているページがback/nextで行き来できる範囲
    // 中がさらにフォルダで分かれていても行き来できる
    readingGroups?: string[]
  }
> = {
  white: {
    title: "眠りの白に導かれ",
    readingGroups: ["main"],
  },
  times: {
    title: "時の欠片",
    readingGroups: ["main", "extra/arasi"],
  },
}

export const getSeriesTitle = (series: string): string => {
  const info = seriesInfo[series]
  if (!info) {
    throw new Error(`src/data/series.ts の seriesInfo に "${series}" がありません`)
  }
  return info.title
}

// そのページが属する back/next の範囲を返す
// どのreadingGroupにも入らないページは、自分自身が範囲になる（＝単独）
export const readingGroupOf = (entryId: string): string => {
  const series = entryId.split("/")[0]
  const groups = seriesInfo[series]?.readingGroups ?? []
  const hit = groups
    .filter((g) => entryId.startsWith(`${series}/${g}/`))
    // 入れ子のときは内側を優先する
    .sort((a, b) => b.length - a.length)[0]
  return hit ? `${series}/${hit}` : entryId
}
