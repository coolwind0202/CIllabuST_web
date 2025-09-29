import { SubjectCategory } from "../_types/syllabus"

export function getCategoryText(category: SubjectCategory) {
  switch (category) {
    case "pe":
      return "一般:体育"
    case "fl":
      return "一般:外国語"
    case "general":
      return "一般:その他"
    case "photon":
      return "専門:電子光"
    case "chembio":
      return "専門:応科"
    case "infosys":
      return "専門:情シス"
    case "teacher":
      return "教職"
    case "unknown":
      return "不明"
  }
}
