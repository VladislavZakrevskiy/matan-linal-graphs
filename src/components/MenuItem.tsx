import { FC } from "react";
import { MenuFunction, useFunctionsStore } from "../model/functionsStore/useFunctionsStore";
import { MatrixInput } from "./Inputs/MatrixInput";
import { PointInput } from "./Inputs/PointInput";
import { VectorInput } from "./Inputs/VectorInput";
import { FormulaEditor } from "./Inputs/FormulaEditor";
import { ScaleInput } from "./Inputs/ScaleInput";
import { GridInput } from "./Inputs/GridInput";
import { ParametreFormulaEditor } from "./Inputs/ParametreFormulaEditor";
import { DerevativeEditor } from "./Inputs/DerevativeInput";
import { StartCoordInput } from "./Inputs/StartCoordInput";
interface MenuItemProps {
  functionItem: MenuFunction;
}

export const MenuItem: FC<MenuItemProps> = ({ functionItem }) => {
  const { removeMenuFunctions } = useFunctionsStore();
  const removeMenuItem = (funcId: string) => () => removeMenuFunctions(funcId);

  if (functionItem.type === "start_coord") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          SC
        </div>
        <StartCoordInput funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "derevative") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          D
        </div>
        <DerevativeEditor funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "parametre_function") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          P
        </div>
        <ParametreFormulaEditor funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "grid") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          G
        </div>
        <GridInput funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "scale") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          S
        </div>
        <ScaleInput funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "function") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7`}
        >
          F
        </div>
        <FormulaEditor funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "basis") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7 `}
        >
          B
        </div>
        <MatrixInput funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "point") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7 `}
        >
          P
        </div>
        <PointInput funcId={functionItem.id} />
      </div>
    );
  }

  if (functionItem.type === "vector") {
    return (
      <div className="flex gap-2 items-center">
        <div
          onClick={removeMenuItem(functionItem.id)}
          style={{ backgroundColor: functionItem.color, content: "X" }}
          className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7 `}
        >
          V
        </div>
        <VectorInput funcId={functionItem.id} />
      </div>
    );
  }

  return null;
};
