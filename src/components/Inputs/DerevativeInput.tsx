import { Input } from "antd";
import { useFunctionsStore } from "../../model/functionsStore/useFunctionsStore";
import useDebounce from "../../model/lib/hook/useDebounce";
import { useEffect, useState } from "react";

interface FormulaEditorProps {
  funcId: string;
}

export function DerevativeEditor({ funcId }: FormulaEditorProps) {
  const { functions, setValueFunction } = useFunctionsStore();
  const functionItem = functions.find(({ id }) => id === funcId);
  const value = functionItem?.value as string;
  const [formula, setFormula] = useState("");

  const setValue = () => {
    setValueFunction(funcId, formula);
  };

  const debounceSetValue = useDebounce(() => {
    setValue();
  }, 300);

  useEffect(() => {
    debounceSetValue();
  }, [formula]);

  useEffect(() => {
    setFormula(value);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Input
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        placeholder="x^2 + sin(x) - log(x,10)"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
}
