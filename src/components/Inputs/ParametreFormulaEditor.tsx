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
  const [xFormula, setYFormula] = useState("");
  const [yFormula, setXFormula] = useState("");

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
    setYFormula(value[1]);
    setXFormula(value[0]);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Input
        value={xFormula}
        onChange={(e) => setYFormula(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="t^2 + 2"
      />
      <Input
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
