import { Syllabus } from "../syllabus"
import z from "zod"

export type Syllabus = z.infer<typeof Syllabus>
export type Subject = Syllabus["subjects"][number]
export type SubjectCategory = Subject["category"]
export type SubjectRequisite = Subject["requisite"]
