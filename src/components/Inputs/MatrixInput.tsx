import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";

export const MatrixInput = ({ funcId }: { funcId: string }) => {
  const { setValueFunction, functions } = useFunctionsStore();
  const currentFunction = functions.find(({ id }) => id === funcId)!;
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(0);
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(1);

  const setValue = () =>
    setValueFunction(funcId, [
      [x1, x2],
      [y1, y2],
    ]);
  const debouncedSetValue = useDebounce(setValue, 300);

  useEffect(() => {
    const value = currentFunction.value as number[][];
    setX1(Number(value[0][0]));
    setX2(Number(value[0][1]));
    setY1(Number(value[1][0]));
    setY2(Number(value[1][1]));
  }, []);

  const onCoordsChange = (number: number, coord: "x1" | "x2" | "y1" | "y2") => {
    if (coord === "x1") setX1(number);
    if (coord === "x2") setX2(number);
    if (coord === "y1") setY1(number);
    if (coord === "y2") setY2(number);
  };

  useEffect(() => {
    debouncedSetValue();
  }, [x1, x2, y1, y2, funcId, setValueFunction]);

  return (
    <div className="grid gap-1 grid-cols-2 grid-rows-3 flex-1">
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "x1")} value={x1} placeholder="x1" />
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "x2")} value={x2} placeholder="x2" />
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "y1")} value={y1} placeholder="y1" />
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "y2")} value={y2} placeholder="y2" />
    </div>
  );
};
