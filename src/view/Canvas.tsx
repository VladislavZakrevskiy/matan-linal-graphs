import { useEffect, useRef } from "react";
import { Drawer } from "./Drawer";
import { useResizeObserver } from "../model/lib/hook/useResizeObserver";
import { useFunctionsStore } from "../model/functionsStore/useFunctionsStore";
import * as mathjs from "mathjs";

export const Canvas = () => {
  const drawer = useRef<Drawer>();
  const [canvasRef, { width, height }] = useResizeObserver<HTMLDivElement>();

  const { functions } = useFunctionsStore();
  const lastBasises = functions.filter(({ type }) => type === "basis");
  let lastBasis = lastBasises[lastBasises.length - 1]?.value as number[][];
  if (!lastBasis) {
    lastBasis = [
      [1, 0],
      [0, 1],
    ];
  }

  const scales = functions.filter(({ type }) => type === "scale");
  let lastScale = scales[scales.length - 1]?.value as number;
  if (!lastScale) {
    lastScale = 1;
  }

  const gridDistances = functions.filter(({ type }) => type === "grid");
  let lastGridDistance = gridDistances[gridDistances.length - 1]?.value as number;
  if (!lastGridDistance) {
    lastGridDistance = 100;
  }

  // Axes
  useEffect(() => {
    if (width && height) {
      const drawCoords = () => {
        if (lastGridDistance !== 100) {
          drawer.current?.drawGrid("#333", 1);
        }
        drawer.current?.drawAxes("#fff", 2);
      };

      const drawElements = () => {
        for (const funcItem of functions) {
          const pointValue = funcItem.value as number[];
          const vectorValue = funcItem.value as number[][];
          const width = (drawer.current?.stage.width() || 600) / lastScale;
          const height = (drawer.current?.stage.height() || 600) / lastScale;
          let lastPoint;
          switch (funcItem.type) {
            case "derevative":
              try {
                const compliled = mathjs.derivative(funcItem.value as string, "x").compile();
                for (let i = -Math.round(width); i < Math.round(width); i = i + 5 / (2 * lastScale)) {
                  const result = compliled.evaluate({ x: i });
                  if (mathjs.isNaN(result) || result > height || result < -height) {
                    continue;
                  }
                  if (mathjs.isNumber(result)) {
                    if (lastPoint) {
                      drawer.current?.drawLine(lastPoint, { x: i, y: result }, funcItem.color, 2);
                    }
                    // drawer.current?.drawPoint({ x: i, y: result }, funcItem.color, 2);
                    lastPoint = { x: i, y: result };
                  }
                }
              } catch (e) {
                console.log(e);
              }
              break;
            case "parametre_function":
              try {
                const compliledX = mathjs.compile((funcItem.value as string[])[0]);
                const compliledY = mathjs.compile((funcItem.value as string[])[1]);
                for (let i = -Math.round(width); i < Math.round(width); i = i + 5 / (2 * lastScale)) {
                  const resultX = compliledX.evaluate({ t: i });
                  const resultY = compliledY.evaluate({ t: i });
                  if (mathjs.isNaN(resultX) || mathjs.isNaN(resultY) || mathjs.abs(resultY) > height || mathjs.abs(resultX) > width) {
                    continue;
                  }
                  if (mathjs.isNumber(resultX) && mathjs.isNumber(resultY)) {
                    if (lastPoint) {
                      drawer.current?.drawLine(lastPoint, { x: resultX, y: resultY }, funcItem.color, 2);
                    }
                    // drawer.current?.drawPoint({ x: i, y: result }, funcItem.color, 2);
                    lastPoint = { x: resultX, y: resultY };
                  }
                }
              } catch (e) {
                console.log(e);
              }
              break;
            case "function":
              try {
                const compliled = mathjs.compile(funcItem.value as string);
                for (let i = -Math.round(width); i < Math.round(width); i = i + 5 / (2 * lastScale)) {
                  const result = compliled.evaluate({ x: i });
                  if (mathjs.isNaN(result) || result > height || result < -height) {
                    continue;
                  }
                  if (mathjs.isNumber(result)) {
                    if (lastPoint) {
                      drawer.current?.drawLine(lastPoint, { x: i, y: result }, funcItem.color, 2);
                    }
                    // drawer.current?.drawPoint({ x: i, y: result }, funcItem.color, 2);
                    lastPoint = { x: i, y: result };
                  }
                }
              } catch (e) {
                console.log(e);
              }
              break;
            case "point":
              drawer.current!.drawPoint({ x: pointValue[0], y: pointValue[1] }, funcItem.color, 5);
              break;
            case "vector":
              drawer.current!.drawVector(
                { x: vectorValue[0][0], y: vectorValue[1][0] },
                { x: vectorValue[0][1], y: vectorValue[1][1] },
                funcItem.color,
                3,
                15
              );
              break;
          }
        }
      };

      if (drawer.current) {
        drawer.current.height = height;
        drawer.current.width = width;
        drawer.current.scale = lastScale;
        drawer.current.gridDistance = lastGridDistance;
        drawer.current.clear();
        drawCoords();
        drawElements();
      } else {
        drawer.current = new Drawer("chart", width, height);
        drawer.current.height = height;
        drawer.current.width = width;
        drawer.current.clear();
        drawCoords();
      }
    }
  }, [canvasRef, height, width, functions, lastScale, lastGridDistance]);

  // Animation
  useEffect(() => {
    if (width && height && drawer.current) {
      const xPoint = { x: lastBasis[0][0], y: lastBasis[1][0] };
      const yPoint = { x: lastBasis[0][1], y: lastBasis[1][1] };
      drawer.current!.setBasisX = xPoint;
      drawer.current!.setBasisY = yPoint;
      drawer.current.animateVectors(2);
      drawer.current.animateLines(2);
      if (lastGridDistance !== 100) {
        drawer.current.animateGrid(2);
      }
      drawer.current.animatePoints(2);
      drawer.current.animateAxes(2);
    }
  }, [canvasRef, height, width, lastBasis, lastGridDistance]);

  return <div id="chart" ref={canvasRef} className="w-full h-full" />;
};
