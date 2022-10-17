export interface OptionRowProps {
  modeOneSwitch: JSX.Element;
  modeOneInputs: JSX.Element[];
  modeOneText: string;
  modeTwoSwitch: JSX.Element;
  modeTwoText: string;
}

export const OptionRow = ({
  modeOneText,
  modeOneInputs: [a, b, c, d],
  modeOneSwitch,
  modeTwoSwitch,
  modeTwoText,
}: OptionRowProps) => {
  return (
    <div className="rounded bg-white p-2 shadow">
      <div className="flex flex-row items-center gap-x-2">
        <div className="mt-1.5">{modeOneSwitch}</div>
        <div className="text-lg">{modeOneText}</div>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <div className="mt-1.5">{modeTwoSwitch}</div>
        <div className="text-lg">{modeTwoText}</div>
      </div>
      <div className="flex items-center gap-x-2">Range:</div>
      <div>
        ({a} to {b}) + ({c} to {d})
      </div>
    </div>
  );
};
