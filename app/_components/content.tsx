"use client";

import { Input } from "@heroui/input";
import { Syllabus } from "@/app/syllabus";
import z from "zod";
import { useFuse } from "../_hooks/use_fuse";
//@ts-ignore
import Highlighter from "react-highlight-words";
import { useQueryState } from "nuqs";

export type Props = {
  syllabus: z.infer<typeof Syllabus>
};

export function Content({ syllabus }: Props) {
  const [word, setWord] = useQueryState("word");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const { search } = useFuse(syllabus.subjects,
    { keys: ["summary", "name", "cources", "goal"], threshold: 0.1, ignoreLocation: true, includeMatches: true });
  const searchResult = search(word ?? "");

  return (
    <div className="p-8 flex flex-col gap-6">
      <section>
        <Input
          placeholder="例: 光エレクトロニクス"
          label="検索ワード"
          value={word ?? ""}
          onChange={handleSearchChange}
        />
      </section>
      <ul className="flex flex-col gap-6">
        {searchResult.map((entry) => {
          const subject = entry.item;
          const matches = entry.matches ?? [];

          return (
            <li key={`${subject.category}_${subject.name}`}>
              <h1 className="font-bold text-2xl">{subject.name}</h1>
              <p className="text-gray-400">
                {
                  /* Fuse can generate multiple same match objects, so we should use index as key. */
                  matches.map((match, i) => (
                    <Highlighter
                      key={i}
                      highlightStyle={{ backgroundColor: "darkslateblue", color: "white" }}
                      textToHighlight={match.value}
                      searchWords={[]}
                      findChunks={() => match.indices.map(range => ({ start: range[0], end: range[1] + 1 }))} />
                  ))
                }
              </p>
            </li>
          )
        })
        }
      </ul>
    </div>
  );
}
