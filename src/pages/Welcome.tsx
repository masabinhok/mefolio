import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress"
import Portfolio from "./Portfolio";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useVisitor } from "@/context/VisitorContext";


const Welcome = () => {
  const { visitor, setVisitor } = useVisitor();
  const [hasName, setHasName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgess] = useState(13);
  const [portfolio, setPortfolio] = useState(false);

  const loadPortfolio = () => {
    setTimeout(() => {
      setProgess(69);
    }, 1000)

    setTimeout(() => {
      setProgess(99);
    }, 2000)

    setTimeout(() => {
      setProgess(100);
      setLoading(false);
      setPortfolio(true);
    }, 3000)

  }

  useEffect(() => {
    const storedVisitor = localStorage.getItem('visitor');
    if (storedVisitor) {
      setHasName(true);
      setVisitor(storedVisitor);
      setLoading(true);
      loadPortfolio();
    }

  }, [])

  const handleSave = async () => {
    localStorage.setItem('visitor', visitor + ".");
    setHasName(true);
    setLoading(true);

    loadPortfolio();

  };

  if (portfolio) {
    return <Portfolio />
  }

  return (
    <div className="bg-background min-h-screen flex flex-col gap-3 items-center justify-center text-secondary text-center p-10">
      <h2 className={cn("max-w-[600px]",
        loading ? 'slide-up' : null
      )}>
        Hello, {" "}
        <span className="text-primary">
          {hasName ? (
            visitor
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">May I have your name?</Button>
              </DialogTrigger>
              <DialogContent className="max-sm:p-10">
                <DialogHeader>
                  <DialogTitle className="text-primary">
                    Welcome
                  </DialogTitle>
                  <DialogDescription >
                    It would be a pleasure to know your name to make our interaction more personal.
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <Input
                    id="name"
                    min={2}
                    value={visitor}
                    onChange={(e) => {
                      setVisitor(e.target.value)
                    }}
                    className="col-span-3 text-secondary w-full max-sm:text-sm"
                    placeholder="Please enter your name here"
                  />
                </div>
                <DialogFooter>
                  <Button
                    className={cn()}
                    onClick={handleSave}
                    disabled={visitor.length < 2}
                  >
                    Save Name
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </span>
        {" "} <br /> I am delighted to have you here. I hope you have a wonderful experience exploring my portfolio!

      </h2>
      {
        loading ? (<Progress className="w-[200px]" value={progress} />) : null
      }


    </div>
  );
};

export default Welcome;
