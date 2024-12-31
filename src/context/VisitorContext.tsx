import { IVisitor } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface VisitorContextType {
  visitor: IVisitor;
  setVisitor: (visitor: IVisitor) => void;
  setName: (name: string) => void;
  name: string;
  visitorCount: number;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('');
  const storedVisitor = localStorage.getItem('visitor');
  const [visitorCount, setVisitorCount] = useState<number>(0);
  useEffect(() => {
    const fetchVisitorsCount = async () => {
      try {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/visitor/count`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json()).then(data => {
          setVisitorCount(data.count);
          localStorage.setItem('visitorCount', JSON.stringify(data.count));
        });
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchVisitorsCount();
  }, [])
  const [visitor, setVisitor] = useState<IVisitor>(storedVisitor ? JSON.parse(storedVisitor) : {} as IVisitor);
  return (
    <VisitorContext.Provider value={{ visitor, setVisitor, setName, name, visitorCount }}>
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
