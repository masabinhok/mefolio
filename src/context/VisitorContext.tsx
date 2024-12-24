import { IVisitor } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface VisitorContextType {
  visitor: IVisitor;
  setVisitor: (visitor: IVisitor) => void;
  setName: (name: string) => void;
  name: string;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('');
  const storedVisitor = localStorage.getItem('visitor');
  const [visitor, setVisitor] = useState<IVisitor>(storedVisitor ? JSON.parse(storedVisitor) : {} as IVisitor);
  return (
    <VisitorContext.Provider value={{ visitor, setVisitor, setName, name }}>
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = (): VisitorContextType => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
};
