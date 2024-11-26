import { InputNumber } from "antd";
import { FC, useEffect, useState } from "react";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";

interface PointInputProps {
  funcId: string;
}

export const PointInput: FC<PointInputProps> = ({ funcId }) => {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const { functions, setValueFunction } = useFunctionsStore();
  const currentFunc = functions.find(({ id }) => id === funcId);

  const setValue = () => setValueFunction(funcId, [x, y]);
  const debouncedSetValue = useDebounce(setValue, 300);

  useEffect(() => {
    const value = currentFunc?.value as number[];
    setX(value[0]);
    setY(value[1]);
  }, []);

  useEffect(() => debouncedSetValue(), [x, y]);

  return (
    <div className="grid grid-cols-2 flex-1 gap-1">
      <InputNumber value={x} onChange={(number) => setX(Number(number))} placeholder="x" />
      <InputNumber value={y} onChange={(number) => setY(Number(number))} placeholder="y" />
    </div>
  );
};
