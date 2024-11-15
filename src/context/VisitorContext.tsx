import { createContext, ReactNode, useContext, useState } from "react";

interface VisitorContextType {
  visitor: string;
  setVisitor: (name: string) => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);


export const VisitorProvider = ({ children }: {
  children: ReactNode
}) => {
  const [visitor, setVisitor] = useState<string>('')
  return (
    <VisitorContext.Provider value={{
      visitor, setVisitor
    }}>
      {children}
    </VisitorContext.Provider>)
}

export const useVisitor = (): VisitorContextType => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitor must be used within a VisitorProvider')
  }
  return context;
}
