import { Slider } from "antd";
import { FC, useEffect, useState } from "react";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";

interface PointInputProps {
  funcId: string;
}

export const GridInput: FC<PointInputProps> = ({ funcId }) => {
  const [grid, setGrid] = useState(12.5);
  const { functions, setValueFunction } = useFunctionsStore();
  const currentFunc = functions.find(({ id }) => id === funcId);

  const setValue = () => setValueFunction(funcId, grid);
  const debouncedSetValue = useDebounce(setValue, 300);

  useEffect(() => {
    const value = currentFunc?.value as number;
    setGrid(value);
  }, []);

  useEffect(() => debouncedSetValue(), [grid]);

  return (
    <div className="flex-1">
      <Slider value={grid} onChange={(number) => setGrid(Number(number))} min={5} max={100} step={0.5} />
    </div>
  );
};
