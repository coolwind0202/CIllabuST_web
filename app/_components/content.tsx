"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox"
import { Divider } from "@heroui/divider"
import { useFuse } from "../_hooks/use_fuse";
//@ts-ignore
import Highlighter from "react-highlight-words";
import { parseAsArrayOf, parseAsNumberLiteral, parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { Syllabus } from "../syllabus";
import { getCategoryText } from "../_properties/category";
import { getRequisiteText } from "../_properties/requisute";
import React from "react";
import z from "zod";

export type Props = {
  syllabus: z.infer<typeof Syllabus>
};

export function Content({ syllabus }: Props) {
  const [fulltextWord, setFullTextWord] = useQueryState("fulltext_word", parseAsString.withDefault(""));
  const handleFullTextWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullTextWord(event.target.value);
  };

  const subjectSchema = Syllabus.shape.subjects.element;
  const categorySchema = subjectSchema.shape.category;
  const requisiteSchema = subjectSchema.shape.requisite;

  const [categories, setCategories] = useQueryState("categories", parseAsArrayOf(parseAsStringEnum(categorySchema.options)).withDefault(categorySchema.options));
  const handleCategoryChange = (values: string[]) => {
    const choices = values.map(value => categorySchema.safeParse(value)).map(result => result.data).filter((data): data is z.infer<typeof categorySchema> => data != undefined);
    setCategories(choices);
  }

  const validSchoolYears = [1, 2, 3, 4];
  const [schoolYears, setSchoolYears] = useQueryState("school_years", parseAsArrayOf(parseAsNumberLiteral(validSchoolYears)).withDefault(validSchoolYears));
  const handleSchoolYearsChange = (values: string[]) => {
    const choices = values.map(value => parseInt(value)).filter(year => validSchoolYears.includes(year));
    setSchoolYears(choices);
  }

  const [requisites, setRequisites] = useQueryState("requisites", parseAsArrayOf(parseAsStringEnum(requisiteSchema.options)).withDefault(requisiteSchema.options));
  const handleRequisitesChange = (values: string[]) => {
    const choices = values.map(value => requisiteSchema.safeParse(value)).map(result => result.data).filter((data): data is z.infer<typeof requisiteSchema> => data != undefined);
    setRequisites(choices);
  }

  const { fulltextSearch } = useFuse(syllabus.subjects,
    { keys: ["summary", "name", "cources", "goal"], threshold: 0.1, ignoreLocation: true, includeMatches: true });
  const searchResult = fulltextSearch(fulltextWord)
    .filter(entry => categories.includes(entry.item.category))
    .filter(entry => schoolYears.includes(entry.item.school_year))
    .filter(entry => requisites.includes(entry.item.requisite));

  return (
    <div className="p-8 flex flex-col gap-6">
      <section>
        <Input
          placeholder="例: 光エレクトロニクス"
          label="検索ワード"
          value={fulltextWord ?? ""}
          onChange={handleFullTextWordChange}
        />
        <Divider className="my-4" />
        <CheckboxGroup
          value={categories}
          orientation="horizontal"
          label="カテゴリ"
          onValueChange={handleCategoryChange}
          >
          {
            categorySchema.options.map(option => <Checkbox value={option} key={option}>{getCategoryText(option)}</Checkbox>)
          }
        </CheckboxGroup>
        <Divider className="my-4" />
        <CheckboxGroup
          value={schoolYears.map(year => year.toString())}
          orientation="horizontal"
          label="学年"
          onValueChange={handleSchoolYearsChange}
          >
          {
            validSchoolYears.map(year => <Checkbox value={year.toString()} key={year}>{year}</Checkbox>)
          }
        </CheckboxGroup>
        <Divider className="my-4" />
        <CheckboxGroup
          value={requisites}
          orientation="horizontal"
          label="必修・選択"
          onValueChange={handleRequisitesChange}
          >
          {
            requisiteSchema.options.map(option => <Checkbox value={option} key={option}>{getRequisiteText(option)}</Checkbox>)
          }
        </CheckboxGroup>
        <Divider className="my-4" />
      </section>
      <ul className="flex flex-col gap-6">
        {searchResult.map((entry) => {
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
