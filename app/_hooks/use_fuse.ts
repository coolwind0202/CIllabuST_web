import Fuse, { FuseResult, IFuseOptions } from "fuse.js";
import { useCallback } from "react";

export function useFuse<T>(arr: T[], options: IFuseOptions<T>) {
  const fulltextSearch = useCallback((pattern: string): { item: T, fuseResultEntry?: FuseResult<T> }[] => {
    if (pattern == "") return arr.map(element => ({ item: element }));

    const fuse = new Fuse(arr, options);
    const fuseResult = fuse.search(pattern);

    return fuseResult.map(entry => ({ item: entry.item, fuseResultEntry: entry }));
  }, [arr, options]);

  return {
    fulltextSearch
  }
}
