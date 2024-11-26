import { create } from "zustand";
import { getRandomBrightColor } from "../lib/helpers/randomColor";
import { v4 } from "uuid";

type FunctionType = "function" | "basis" | "point" | "vector" | "scale" | "grid" | "parametre_function" | "derevative";
type FunctionValue = string | string[] | number[][] | number[] | number;
export interface MenuFunction {
  id: string;
  value: FunctionValue;
  color: string;
  type: FunctionType;
}

type State = {
  functions: MenuFunction[];
};

type Action = {
  addMenuFuction: (func: { value: FunctionValue; type: FunctionType }) => void;
  setValueFunction: (id: string, newValue: FunctionValue) => void;
  removeMenuFunctions: (id: string) => void;
};

export const useFunctionsStore = create<State & Action>((set) => ({
  functions: [],
  addMenuFuction: (func) => set((store) => ({ functions: [...store.functions, { ...func, id: v4(), color: getRandomBrightColor() }] })),
  setValueFunction: (id, newValue) =>
    set((store) => {
      const funcIndex = store.functions.findIndex(({ id: funcId }) => funcId === id);
      store.functions.splice(funcIndex, 1, { ...store.functions[funcIndex], value: newValue });
      return { ...store, functions: [...store.functions] };
    }),
  removeMenuFunctions: (id) =>
    set((store) => {
      const functions = store.functions.filter(({ id: funcId }) => funcId !== id);
      return { ...store, functions };
    }),
}));
