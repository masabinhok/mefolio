import { useVisitor } from "@/context/VisitorContext";
import { DeleteForever } from "@mui/icons-material";
import { Separator } from "./ui/separator";
import React, { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react";

const Canvas: React.FC = () => {
  const { visitor } = useVisitor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>
    (false);
  const [color, setColor] = useState<string>('#ff0000')
  const [width, setWidth] = useState<number>(1)

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
    setWidth(width)
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    ctx.lineWidth = width;
    ctx.lineCap = 'round'
    ctx.strokeStyle = color
  }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;
    ctx.strokeStyle = color
  }, [color])


  const submitCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${visitor}-mark.png`
    link.click()

    //we can use this imageURL to save the image, or even download it 



    clearCanvas()
  }
  return (
    <div className="section max-md:hidden overflow-hidden">
      <h2 className="text-base mb-3 text-center">Leave your mark, <span className="text-primary">
        {visitor}
      </span>
      </h2>
      <Separator />

      <nav className="flex justify-between items-center gap-3  text-primary p-3  rounded-xl text-sm w-full">
        <div className="flex items-center gap-3"><button onClick={clearCanvas} >
          <DeleteForever />
        </button>
          <label className="flex gap-2 items-center">
            Brush:
            <input
              type="range"

              value={width}
              onChange={(e) => changeWidth(Number(e.target.value))}
              min="1"
              max="10"
              className="w-10"
            />
          </label>

          <label className="flex gap-2 items-center" htmlFor="">
            <span>Color: </span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={`bg-background cursor-pointer boreder-none p-0 `}
            />
          </label></div>


        <button onClick={submitCanvas} >
          <Send className="w-4" />
        </button>



      </nav>
      <Separator className="mb-3" />
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