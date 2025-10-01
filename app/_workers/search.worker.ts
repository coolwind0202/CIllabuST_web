import Fuse from "fuse.js";
import { expose } from "comlink";

import { Subject } from "../_types/syllabus";
import { SearchQuery, SearchResult } from "../_types/search";

let subjects: Subject[] = [];
let fuse: Fuse<Subject> | null = null;

const searchWorker = {
  initialize(newSubjects: Subject[]) {
    subjects = newSubjects;
    fuse = new Fuse(subjects, {
      keys: ["summary", "name", "cources", "goal"],
      threshold: 0.1,
      ignoreLocation: true,
      includeMatches: true,
    });
  },

  search(query: SearchQuery): SearchResult[] {
    if (!fuse || subjects.length === 0) {
      return [];
    }

    const results = fuse.search(query.keyword);

    // Apply additional filters if provided
    let filteredResults = results;

    if (query.filter) {
      filteredResults = results.filter((result) => {
        const subject = result.item;

        if (
          query.filter?.school_year !== undefined &&
          subject.school_year !== query.filter.school_year
        ) {
          return false;
        }

        if (
          query.filter?.category !== undefined &&
          subject.category !== query.filter.category
        ) {
          return false;
        }

        if (
          query.filter?.requisite !== undefined &&
          subject.requisite !== query.filter.requisite
        ) {
          return false;
        }

        return true;
      });
    }

    return filteredResults.map((result) => ({
      item: result.item,
      matches: result.matches?.map((match) => ({
        value: match.value || "",
        indices: match.indices || [],
      })),
    }));
  },
};

expose(searchWorker);
