export interface OptionRowProps {
  switchElement: JSX.Element;
  numberInputs: JSX.Element[];
  text: string;
}

export const OptionRow = ({
  switchElement,
  numberInputs: [a, b, c, d],
  text,
}: OptionRowProps) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-x-2">
        <div className="mt-1.5">{switchElement}</div>
        <div className="text-lg">{text}</div>
      </div>
      <div className="flex items-center gap-x-2">
        Range: ({a} to {b}) + ({c} to {d})
      </div>
    </div>
  );
};
