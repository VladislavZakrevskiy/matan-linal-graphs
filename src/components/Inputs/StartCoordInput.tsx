import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";

export const StartCoordInput = ({ funcId }: { funcId: string }) => {
  const { setValueFunction, functions } = useFunctionsStore();
  const currentFunction = functions.find(({ id }) => id === funcId)!;
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(0);

  const setValue = () => setValueFunction(funcId, [x0, y0]);
  const debouncedSetValue = useDebounce(setValue, 300);

  useEffect(() => {
    const value = currentFunction.value as number[];
    setX0(Number(value[0]));
    setY0(Number(value[1]));
  }, []);

  const onCoordsChange = (number: number, coord: "x0" | "y0") => {
    if (coord === "x0") setX0(number);
    if (coord === "y0") setY0(number);
  };

  useEffect(() => {
    debouncedSetValue();
  }, [x0, y0, funcId]);

  return (
    <div className="grid gap-1 grid-cols-1 grid-rows-2 flex-1">
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "x0")} value={x0} placeholder="x0" />
      <InputNumber onChange={(number) => onCoordsChange(Number(number), "y0")} value={y0} placeholder="y0" />
    </div>
  );
};
