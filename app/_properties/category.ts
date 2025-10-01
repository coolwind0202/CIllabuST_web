import { SubjectCategory } from "../_types/syllabus"

export function getCategoryText(category: SubjectCategory) {
  switch (category) {
    case "pe":
      return "一般科目（体育）"
    case "fl":
      return "一般科目（外国語）"
    case "general":
      return "一般科目（その他）"
    case "photon":
      return "専門科目（電子光）"
    case "chembio":
      return "専門科目（応化）"
    case "infosys":
      return "専門科目（情シス）"
    case "teacher":
      return "教職科目"
    case "unknown":
      return "分類不明"
  }
}
