import { createContext } from "react";

export const DataContext = createContext<{
  updateStack: (update: any) => void;
  onDelete: (index: number, entry: any) => void;
  onUpdate: (
    index: number,
    keyDepth: number,
    updatedValue: string,
    entry: any
  ) => void;
}>({} as any);



