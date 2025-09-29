"use client";

import { Input } from "@heroui/input";
import { Syllabus } from "@/app/syllabus";
import z from "zod";
import { useFuse } from "../_hooks/use_fuse";
import { useState } from "react";

export type Props = {
  syllabus: z.infer<typeof Syllabus>
};

export function Content({ syllabus }: Props) {
  const [word, setWord] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const { search } = useFuse(syllabus.subjects,
    { keys: ["summary", "name", "cources", "goal"], threshold: 0.1, ignoreLocation: true });
  const searchResult = search(word);

  return (
    <div className="p-8 flex flex-col gap-6">
      <section>
        <Input
          placeholder="例: 光エレクトロニクス"
          label="検索ワード"
          onChange={handleSearchChange}
        />
      </section>
      <ul className="flex flex-col gap-6">
        {searchResult.map((entry) => {
          const subject = entry.item;
          return (
            <li key={`${subject.category}_${subject.name}`}>
              <h1 className="font-bold text-2xl">{subject.name}</h1>
              <p>{subject.summary}</p>
            </li>
          )
        })
        }
      </ul>
    </div>
  );
}
