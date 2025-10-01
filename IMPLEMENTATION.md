# Web Worker Search Implementation

## Overview
This implementation moves the search functionality to a Web Worker using Comlink, preventing UI blocking during search operations.

## Architecture

### Files Created

1. **app/_types/search.ts**
   - Defines `SearchQuery` type with keyword and optional filters
   - Defines `SearchResult` type for search results

2. **app/_workers/search.worker.ts**
   - Web Worker that performs search operations
   - `initialize(subjects)`: Stores subjects and initializes Fuse.js
   - `search(query)`: Executes search and returns results
   - Uses Fuse.js for fuzzy search
   - Supports filtering by school_year, category, and requisite

3. **app/_hooks/use_search_worker.ts**
   - React hook that wraps the Web Worker with Comlink
   - Initializes worker on mount
   - Provides `search` function that calls the worker
   - Cleans up worker on unmount

4. **app/_components/subject_list.tsx**
   - Extracted component that displays search results
   - Receives search results as props
   - Renders subject cards with highlighting

5. **app/_components/content.tsx** (updated)
   - Uses `useSearchWorker` hook
   - Uses `useDeferredValue` to debounce search input
   - Uses `useTransition` to show loading state
   - Delegates rendering to SubjectList component

## React 18 Compatibility

The implementation uses React 18 compatible patterns:
- `useDeferredValue` for input debouncing
- `useTransition` for managing async state transitions
- No use of React 19's `use()` hook

## Performance Benefits

- Search operations run in a separate thread, keeping UI responsive
- Fuse.js index is created once and reused for all searches
- useDeferredValue prevents excessive re-renders during typing
- useTransition provides smooth loading states

## Dependencies Added

- `comlink`: For easy communication between main thread and Web Worker
