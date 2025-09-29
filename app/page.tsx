import { Input } from "@heroui/input";
import { fetchSyllabus } from "./fetcher";

export default async function Home() {
  const syllabus = await fetchSyllabus();

  return (
    <div className="p-8 flex flex-col gap-3">
      <section>
        <Input placeholder="例: 光エレクトロニクス" label="検索ワード" />
      </section>
      <ul className="flex flex-col gap-6">
        {syllabus.subjects.map((subject) => (
          <li key={`${subject.category}_${subject.name}`}>
            <h1 className="font-bold text-2xl">{subject.name}</h1>
            <p>{subject.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
