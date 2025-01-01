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
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress"
import Portfolio from "./Portfolio";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useVisitor } from "@/context/VisitorContext";


const Welcome = () => {
  const { name, setName, visitor, setVisitor, fetchVisitorsCount } = useVisitor();
  const [hasName, setHasName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgess] = useState(13);
  const [portfolio, setPortfolio] = useState(false);

  const loadPortfolio = useCallback(() => {
    setProgess(0); // Reset progress at the start



    setTimeout(() => {
      setProgess(96);
    }, 1000);

    setTimeout(() => {
      setProgess(69);
    }, 1500);


    setTimeout(() => {
      setProgess(0);
      setLoading(false);
      setPortfolio(true);
    }, 2000);
  }, []);


  useEffect(() => {
    if (visitor?.name) {
      setHasName(true);
      setLoading(true);
      loadPortfolio();
    }
  }, [setName, loadPortfolio])

  const handleSave = async () => {
    if (!name || name.length < 2) {
      console.error("Name must be at least 2 characters long.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/visitor/name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving name:", errorData.message || response.statusText);
        return;
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('visitor', JSON.stringify(data.visitor));
        setVisitor(data.visitor);
        setHasName(true);
        fetchVisitorsCount();
        setLoading(true); // Ensure loading is set immediately
        setProgess(0); // Reset progress to 0 before starting
        loadPortfolio(); // Start loading the portfolio
      } else {
        console.error("Failed to save name:", data.message);
      }
    } catch (error) {
      if (error === 'AbortError') {
        console.error("Request timed out.");
      } else {
        console.error("Unexpected error:", error);
      }
    }
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
            visitor?.name
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
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    className="col-span-3 text-secondary w-full max-sm:text-sm"
                    placeholder="Please enter your name here"
                  />
                </div>
                <DialogFooter>
                  <Button
                    className={cn()}
                    onClick={handleSave}
                    disabled={name.length < 2}
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
        loading ? (<>
          <Progress className="w-[200px]" value={progress} />
          <span className="text-sm">{progress}</span>
        </>
        ) : null
      }


    </div>
  );
};

export default Welcome;
