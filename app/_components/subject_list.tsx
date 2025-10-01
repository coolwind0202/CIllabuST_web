import { Button } from "@heroui/button";
//@ts-ignore
import Highlighter from "react-highlight-words";

import { getCategoryText } from "../_properties/category";
import { getRequisiteText } from "../_properties/requisute";
import { SearchResult } from "../_types/search";

export type Props = {
  searchResults: SearchResult[];
};

export function SubjectList({ searchResults }: Props) {
  return (
    <ul className="flex flex-col gap-6">
      {searchResults.map((entry) => {
        const subject = entry.item;
        const matches = entry.matches ?? [];

        return (
          <li key={`${subject.category}_${subject.name}`}>
            <div className="flex gap-3 mb-1">
              <h1 className="font-bold text-2xl">{subject.name}</h1>
              <Button size="sm">{getCategoryText(subject.category)}</Button>
              <Button size="sm">{subject.school_year}年</Button>
              <Button size="sm">{getRequisiteText(subject.requisite)}</Button>
            </div>
            <p className="text-gray-400">
              {
                /* Fuse can generate multiple same match objects, so we should use index as key. */
                matches.map((match, i) => (
                  <Highlighter
                    key={i}
                    findChunks={() =>
                      match.indices.map((range) => ({
                        start: range[0],
                        end: range[1] + 1,
                      }))
                    }
                    highlightStyle={{
                      backgroundColor: "darkslateblue",
                      color: "white",
                    }}
                    searchWords={[]}
                    textToHighlight={match.value}
                  />
                ))
              }
            </p>
          </li>
        );
      })}
    </ul>
  );
}
