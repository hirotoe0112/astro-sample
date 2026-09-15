import { getCollection } from "astro:content"

// フォルダ名の並び順で並び替える
export const compareIds = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true })

export const folderOf = (entryId: string): string =>
  entryId.replace(/\/[^/]+$/, "")


// 指定フォルダの直下にあるページを、ファイル名順で返す
export const entriesOf = async (folder: string) => {
  const entries = (await getCollection("novels"))
    .filter((e) => folderOf(e.id) === folder)
    .sort((a, b) => compareIds(a.id, b.id))
  if (entries.length === 0) {
    throw new Error(`"${folder}" にページがありません`)
  }
  return entries
}

// 指定した1ページを返す
export const entryOf = async (entryId: string) => {
  const entry = (await getCollection("novels")).find((e) => e.id === entryId)
  if (!entry) {
    throw new Error(`"${entryId}" というページがありません`)
  }
  return entry
}
