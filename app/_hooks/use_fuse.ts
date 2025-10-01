import Fuse, { IFuseOptions } from "fuse.js";
import { useCallback } from "react";

export function useFuse<T>(arr: T[], options: IFuseOptions<T>) {
  const search = useCallback(
    (pattern: string) => {
      const fuse = new Fuse(arr, options);

      return fuse.search(pattern);
    },
    [arr, options],
  );

  return {
    search,
  };
}
