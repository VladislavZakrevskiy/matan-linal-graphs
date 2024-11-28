import { useFunctionsStore } from "../model/functionsStore/useFunctionsStore";
import { Button, Divider, Dropdown, Typography } from "antd";
import { MenuItem } from "./MenuItem";
import { useResizeObserver } from "../model/lib/hook/useResizeObserver";
import React from "react";
import "../index.css";

export const Menu = () => {
  const { functions, addMenuFuction, removeMenuFunctions } = useFunctionsStore();
  const [ref, { width }] = useResizeObserver<HTMLDivElement>();

  const addFuncMenu = () =>
    addMenuFuction({
      value: "",
      type: "function",
    });

  const addBasisMenu = () =>
    addMenuFuction({
      value: [
        [1, 0],
        [0, 1],
      ],
      type: "basis",
    });

  const addPointMenu = () => addMenuFuction({ value: [0, 0], type: "point" });
  const addVectorMenu = () =>
    addMenuFuction({
      value: [
        [0, 1],
        [1, 0],
      ],
      type: "vector",
    });
  const addScale = () => addMenuFuction({ type: "scale", value: 1 });
  const addGridDistance = () => addMenuFuction({ type: "grid", value: 100 });
  const addParametreFunction = () => addMenuFuction({ type: "parametre_function", value: ["", ""] });
  const addDerevative = () => addMenuFuction({ type: "derevative", value: "" });
  const addStartCoord = () => addMenuFuction({ type: "start_coord", value: [0, 0] });

  return (
    <div ref={ref} className={"p-3 flex flex-col menu"}>
      {width > 170 ? <Typography.Title>Functions</Typography.Title> : <Typography.Title>Func</Typography.Title>}

      <Divider />
      <div className={"flex flex-col gap-1" + (width < 170 ? " justify-center items-center" : "")}>
        {width > 170
          ? functions.map((functionItem) => (
              <React.Fragment key={functionItem.id}>
                <MenuItem functionItem={functionItem} />
                <Divider />
              </React.Fragment>
            ))
          : functions.map((functionItem) => (
              <div
                key={functionItem.id}
                style={{
                  backgroundColor: functionItem.color,
                }}
                onClick={() => removeMenuFunctions(functionItem.id)}
                className={`flex text-black font-bold justify-center items-center rounded-full w-7 h-7 ${
                  width < 170 ? " rounded-md w-full" : ""
                }`}
              >
                {functionItem.type[0].toUpperCase()}
              </div>
            ))}
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Function",
                onClick: addFuncMenu,
              },
              {
                key: "2",
                label: "Basis vectors",
                onClick: addBasisMenu,
              },
              {
                key: "3",
                label: "Vector",
                onClick: addVectorMenu,
              },
              {
                key: "4",
                label: "Point",
                onClick: addPointMenu,
              },
              {
                key: "5",
                label: "Scale",
                onClick: addScale,
              },
              {
                key: "6",
                label: "Grid Distance",
                onClick: addGridDistance,
              },
              {
                key: "7",
                label: "Parametre Function",
                onClick: addParametreFunction,
              },
              { key: "8", label: "Derevative", onClick: addDerevative },
              { key: "9", label: "Start Coordinates Point", onClick: addStartCoord },
            ],
          }}
        >
          <Button className="w-full">+</Button>
        </Dropdown>
      </div>
    </div>
  );
};
