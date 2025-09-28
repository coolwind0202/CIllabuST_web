import { Syllabus } from "./syllabus"

const SYLLABUS_URL = "https://raw.githubusercontent.com/coolwind0202/CIllabuST_jsons/refs/heads/main/dist/syllabus.json" as const;

export async function fetchSyllabus() {
  const resp = await fetch(SYLLABUS_URL);
  const json = await resp.json();

  const syllabus = Syllabus.parse(json);
  return syllabus;
}
