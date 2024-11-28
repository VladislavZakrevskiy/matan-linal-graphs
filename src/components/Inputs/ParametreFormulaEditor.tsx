import { Input } from "antd";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";
import { useEffect, useState } from "react";

interface FormulaEditorProps {
  funcId: string;
}

export function ParametreFormulaEditor({ funcId }: FormulaEditorProps) {
  const { functions, setValueFunction } = useFunctionsStore();
  const functionItem = functions.find(({ id }) => id === funcId);
  const value = functionItem?.value as string[];
  const [xFormula, setXFormula] = useState("");
  const [yFormula, setYFormula] = useState("");

  const setValue = () => {
    setValueFunction(funcId, [xFormula, yFormula]);
  };

  const debounceSetValue = useDebounce(() => {
    setValue();
  }, 300);

  useEffect(() => {
    debounceSetValue();
  }, [xFormula, yFormula]);

  useEffect(() => {
    setXFormula(value[0]);
    setYFormula(value[1]);
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-1">
      <Input
        addonBefore="x(t) ="
        value={xFormula}
        onChange={(e) => setYFormula(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="t^2 + 2"
      />
      <Input
        addonBefore="y(t) ="
        value={yFormula}
        onChange={(e) => setXFormula(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="sin(t)"
      />
    </div>
  );
}
