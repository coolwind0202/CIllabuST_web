import { Suspense } from "react";

import { Content } from "./_components/content";
import { fetchSyllabus } from "./fetcher";

export default async function Home() {
  const syllabus = await fetchSyllabus();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content syllabus={syllabus} />
    </Suspense>
  );
}
