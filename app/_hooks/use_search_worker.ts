import { useEffect, useRef, useCallback } from "react";
import { wrap, Remote } from "comlink";

import { Subject } from "../_types/syllabus";
import { SearchQuery, SearchResult } from "../_types/search";

type SearchWorkerType = {
  initialize(subjects: Subject[]): void;
  search(query: SearchQuery): Promise<SearchResult[]>;
};

export function useSearchWorker(subjects: Subject[]) {
  const workerRef = useRef<Worker | null>(null);
  const workerApiRef = useRef<Remote<SearchWorkerType> | null>(null);

  useEffect(() => {
    // Create the worker
    workerRef.current = new Worker(
      new URL("../_workers/search.worker.ts", import.meta.url),
      { type: "module" },
    );

    // Wrap the worker with Comlink
    workerApiRef.current = wrap<SearchWorkerType>(workerRef.current);

    // Initialize the worker with subjects
    workerApiRef.current.initialize(subjects);

    // Cleanup on unmount
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      workerApiRef.current = null;
    };
  }, [subjects]);

  const search = useCallback(
    async (query: SearchQuery): Promise<SearchResult[]> => {
      if (!workerApiRef.current) {
        return [];
      }

      return workerApiRef.current.search(query);
    },
    [],
  );

  return { search };
}
