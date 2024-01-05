"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const TestPage = () => {
  const containerRef = useRef<any>();
  const canvasRef = useRef<any>();

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    let engine = Engine.create();

    /**
     * @element - canvas를 담을 HTMLelement
     * @engine - 사용할 engine
     * @canvas - 렌더링할 캔버스
     * option: {
     *   @width - 렌더링의 넓이
     *   @height - 렌더링의 높이
     *   @background - 렌더링 기본 색상 (배경)
     *   @wireframes - 해당 캔버스가 wireframes만 렌더링할 것인지
     * }
     */
    let render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 600,
        height: 600,
        background: "skyblue",
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(300, 600, 600, 30, {
      isStatic: true,
      render: {
        fillStyle: "#99dd33",
      },
    });

    const ballA = Bodies.circle(300, -1000, 50, {
      restitution: 0.9,
    });
    const ballB = Bodies.circle(300, 500, 50, {
      restitution: 0.9,
    });
    const ballC = Bodies.circle(300, 150, 50, {
      restitution: 0.9,
    });
    World.add(engine.world, [floor, ballA, ballB, ballC]);

    Matter.Runner.run(engine);
    Render.run(render);
  }, []);
  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: 600,
          height: 600,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      <div>hi</div>
    </>
  );
};

export default TestPage;
