"use client";

import { Input } from "@heroui/input";
import { useQueryState } from "nuqs";
import { useDeferredValue, useState, useEffect, useTransition } from "react";

import { Syllabus } from "../_types/syllabus";
import { useSearchWorker } from "../_hooks/use_search_worker";
import { SearchResult } from "../_types/search";

import { SubjectList } from "./subject_list";

export type Props = {
  syllabus: Syllabus;
};

export function Content({ syllabus }: Props) {
  const [word, setWord] = useQueryState("word");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const { search } = useSearchWorker(syllabus.subjects);
  const deferredWord = useDeferredValue(word ?? "");

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      search({ keyword: deferredWord }).then(setSearchResults);
    });
  }, [deferredWord, search]);

  return (
    <div className="p-8 flex flex-col gap-6">
      <section>
        <Input
          label="検索ワード"
          placeholder="例: 光エレクトロニクス"
          value={word ?? ""}
          onChange={handleSearchChange}
        />
      </section>
      <SubjectList searchResults={searchResults} />
    </div>
  );
}
