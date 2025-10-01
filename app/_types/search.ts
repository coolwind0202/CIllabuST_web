import { Subject, SubjectCategory, SubjectRequisite } from "./syllabus";

export type SearchQuery = {
  keyword: string;
  filter?: {
    school_year?: number;
    category?: SubjectCategory;
    requisite?: SubjectRequisite;
  };
};

export type SearchResult = {
  item: Subject;
  matches?: Array<{
    value: string;
    indices: ReadonlyArray<readonly [number, number]>;
  }>;
};
