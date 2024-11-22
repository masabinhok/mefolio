import { useVisitor } from "@/context/VisitorContext";
import { Separator } from "@radix-ui/react-separator";
import React, { useEffect, useRef, useState } from "react"

const Canvas: React.FC = () => {
  const { visitor } = useVisitor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>
    (false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath(); //startDrawing
    ctx.moveTo(offsetX, offsetY); //move as the user moves
    setIsDrawing(true)
  }
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

  }
  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false)
  }

  const changeWidth = (width: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    ctx.lineWidth = width;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    ctx.lineWidth = 1;
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'
  }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="section max-md:hidden">
      <h2 className="text-base mb-3 text-center">Leave your mark, <span className="text-primary">
        {visitor}
      </span>
      </h2>
      <nav className="flex items-center gap-3 bg-secondary p-3  rounded-xl text-sm ">

        <button onClick={clearCanvas} className="text-primary ">
          Clear
        </button>
        {[1, 2, 3].map((width) => (
          <button onClick={() => changeWidth(width)} className={`w-${width} h-${width} bg-background rounded-xl`}>
            {" "}
          </button>
        ))}
      </nav>
      <Separator className="my-1 " />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={728}
        height={400}
        className="w-full h-96 relative rounded-xl bg-primary cursor-crosshair"
      >
      </canvas>
    </div>

  )
}

export default Canvas