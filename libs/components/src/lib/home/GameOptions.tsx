import { GameConfig, isEligible } from '@levi-math/common';
import { useMemo } from 'react';
import { useMultiNumberInput } from '../common/useNumberInput';
import { useSelector } from '../common/useSelector';
import { useSwitch } from '../common/useSwitch';
import { OptionRow } from './OptionRow';

export interface GameOptionsProps {
  onClick: (cfg: GameConfig) => void;
}

export const GameOptions = ({ onClick }: GameOptionsProps) => {
  const [additionSwitch, additionChecked] = useSwitch(true);
  const [subtractionSwitch, subtractionChecked] = useSwitch(true);
  const [additionNumberInputs, additionValues] = useMultiNumberInput(
    4,
    [2, 100, 2, 100]
  );

  const [multiplicationSwitch, multiplicationChecked] = useSwitch(true);
  const [divisionSwitch, divisionChecked] = useSwitch(true);
  const [multiplicationNumberInputs, multiplicationValues] =
    useMultiNumberInput(4, [2, 12, 2, 100]);

  const [durationSelector, durationValue] = useSelector(
    [30, 60, 120, 300, 600],
    (value) => <div>{value}</div>,
    2
  );

  const config = useMemo(
    () => ({
      addition: additionChecked,
      subtraction: subtractionChecked,
      multiplication: multiplicationChecked,
      division: divisionChecked,
      additionShape: additionValues,
      multiplicationShape: multiplicationValues,
      duration: durationValue,
    }),
    [
      additionChecked,
      additionValues,
      divisionChecked,
      durationValue,
      multiplicationChecked,
      multiplicationValues,
      subtractionChecked,
    ]
  );

  const handleStart = () => {
    onClick(config);
  };

  const isEligibleForLeaderboard = useMemo(() => isEligible(config), [config]);

  return (
    <>
      <OptionRow
        switchElement={additionSwitch}
        numberInputs={additionNumberInputs}
        text={'Addition'}
      />
      <div className="flex flex-row items-center gap-x-2">
        <div className="mt-1.5">{subtractionSwitch}</div>
        <div className="text-lg">Subtraction</div>
      </div>
      <OptionRow
        switchElement={multiplicationSwitch}
        numberInputs={multiplicationNumberInputs}
        text={'Multiplication'}
      />
      <div className="flex flex-row items-center gap-x-2">
        <div className="mt-1.5">{divisionSwitch}</div>
        <div className="text-lg">Division</div>
      </div>
      <div>
        <div>Duration:</div>
        {durationSelector}
      </div>
      <button
        onClick={handleStart}
        className="rounded bg-sky-500 p-2 text-lg font-semibold text-white transition-colors hover:bg-sky-400"
      >
        Start
      </button>
      <div className="flex items-center gap-x-4">
        {isEligibleForLeaderboard ? (
          <span className="text-green-500">
            This run is eligible for the leaderboard!
          </span>
        ) : (
          <span className="text-red-500">
            This run is ineligible for the leaderboard!
          </span>
        )}
      </div>
    </>
  );
};
