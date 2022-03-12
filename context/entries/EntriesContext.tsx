import { AnyRecordWithTtl } from "dns";
import { createContext } from "react";
import { Entry } from "../../interfaces";

export interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (entry: Entry) => Promise<void>
}

export const EntriesContext = createContext({} as ContextProps);
