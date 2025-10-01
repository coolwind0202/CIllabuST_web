import z from "zod";

import { Syllabus } from "../syllabus";

export type Syllabus = z.infer<typeof Syllabus>;
export type Subject = Syllabus["subjects"][number];
export type SubjectCategory = Subject["category"];
export type SubjectRequisite = Subject["requisite"];
