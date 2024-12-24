import { useVisitor } from "@/context/VisitorContext";
import { DeleteForever } from "@mui/icons-material";
import { Separator } from "./ui/separator";
import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

const Canvas: React.FC = () => {
  const { visitor, setVisitor } = useVisitor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#ff0000");
  const [width, setWidth] = useState<number>(1);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const changeWidth = (width: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = width;
    setWidth(width);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
  }, [width, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || 728;
      canvas.height = 400;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const uploadToCloudinary = async (dataURL: string) => {
    try {
      const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
      };

      const blob = dataURItoBlob(dataURL);
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      console.log("Uploaded Image URL:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const submitCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURL = canvas.toDataURL("image/png");
    uploadToCloudinary(imageURL)
      .then(async (cloudinaryURL) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/visitor/image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloudinaryURL, uuid: visitor?.uuid }),
        });

        if (!response.ok) {
          throw new Error("Failed to save image URL on the server");
        }

        const data = await response.json();
        setVisitor(data.visitor);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while uploading the image. Please try again.");
      })
      .finally(() => {
        clearCanvas();
      });
  };

  return (
    <div className="section overflow-hidden">
      <h2 className="text-base mb-3 text-center">
        Leave your mark, <span className="text-primary">{visitor?.name}</span>
      </h2>
      <Separator />
      <nav className="flex justify-between items-center gap-3 text-primary p-3 rounded-xl text-sm w-full">
        <div className="flex items-center gap-3">
          <button onClick={clearCanvas}>
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
          <label className="flex gap-2 items-center">
            <span>Color: </span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-background cursor-pointer border-none p-0"
            />
          </label>
        </div>
        <button onClick={submitCanvas}>
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
        className="w-full h-96 relative rounded-xl bg-primary cursor-crosshair"
      ></canvas>
    </div>
  );
};

export default Canvas;
