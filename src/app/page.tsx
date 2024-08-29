"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dLength, setDLength] = useState(10);
  const [dAngle, setDAngle] = useState(20);
  const [iterations, setIterations] = useState(10);

  useEffect(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    function drawTree(x1: number, y1: number, angle: number, depth: number) {
      if (depth === 0) return;

      const x2 = x1 + Math.cos((angle * Math.PI) / 180) * depth * dLength;
      const y2 = y1 + Math.sin((angle * Math.PI) / 180) * depth * dLength;

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      drawTree(x2, y2, angle - dAngle, depth - 1);
      drawTree(x2, y2, angle + dAngle, depth - 1);
    }

    if (ctx) {
      ctx.strokeStyle = "red";
      drawTree(400, 800, -90, iterations);
    }
  }, [dAngle, dLength, iterations]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="range"
        onChange={(event) => {
          setDAngle(Number(event.target.value));
        }}
        value={dAngle}
      />
      <input
        type="range"
        onChange={(event) => {
          setDLength(Number(event.target.value));
        }}
        value={dLength}
      />
      <input
        type="range"
        onChange={(event) => {
          setIterations(Number(event.target.value));
        }}
        value={iterations}
        max={15}
      />
      <canvas width={800} height={800} />
    </main>
  );
}
