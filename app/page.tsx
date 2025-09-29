import { Content } from "./_components/content";
import { fetchSyllabus } from "./fetcher";

export default async function Home() {
  const syllabus = await fetchSyllabus();

  return <Content syllabus={syllabus} />;
}
