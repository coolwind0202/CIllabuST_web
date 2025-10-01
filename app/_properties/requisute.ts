import { SubjectRequisite } from "../_types/syllabus";

export function getRequisiteText(requisite: SubjectRequisite) {
  switch (requisite) {
    case "require":
      return "必修";
    case "elective":
      return "選択";
    case "require_elective":
      return "選択必修";
  }
}
