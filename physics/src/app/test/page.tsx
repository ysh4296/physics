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
      isStatic: true,
    });
    const ballC = Bodies.circle(300, 150, 50, {
      restitution: 0.9,
    });

    // HTML 요소 생성
    const ballElement = document.createElement("div");
    ballElement.style.width = "50px";
    ballElement.style.height = "50px";
    ballElement.style.borderRadius = "50%";
    ballElement.style.backgroundColor = "blue";
    ballElement.style.position = "absolute";
    ballElement.style.boxShadow = "0 0 10px 5px rgba(255, 0, 0, 0.5)"; // glowing 클래스 적용

    // HTML 요소를 화면에 추가
    document.body.appendChild(ballElement);

    // 엔진 업데이트 이벤트를 사용하여 바디 위치 업데이트
    Matter.Events.on(engine, "beforeUpdate", function () {
      ballElement.style.transform = `translate(${ballB.position.x - 25}px, ${
        ballB.position.y - 25
      }px)`;
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
