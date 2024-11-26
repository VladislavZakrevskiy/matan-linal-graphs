import { Slider } from "antd";
import { FC, useEffect, useState } from "react";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";

interface PointInputProps {
  funcId: string;
}

export const ScaleInput: FC<PointInputProps> = ({ funcId }) => {
  const [scale, setScale] = useState(1);
  const { functions, setValueFunction } = useFunctionsStore();
  const currentFunc = functions.find(({ id }) => id === funcId);

  const setValue = () => setValueFunction(funcId, scale);
  const debouncedSetValue = useDebounce(setValue, 300);

  useEffect(() => {
    const value = currentFunc?.value as number;
    setScale(value);
  }, []);

  useEffect(() => debouncedSetValue(), [scale]);

  return (
    <div className="flex-1">
      <Slider value={scale} onChange={(number) => setScale(Number(number))} min={1} max={50} step={1} />
    </div>
  );
};
