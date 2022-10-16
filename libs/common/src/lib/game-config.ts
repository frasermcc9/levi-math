export interface GameConfig {
  addition: boolean;
  subtraction: boolean;
  multiplication: boolean;
  division: boolean;

  additionShape: [number, number, number, number];
  multiplicationShape: [number, number, number, number];

  duration: number;
}

export const defaultGameConfig: GameConfig = {
  addition: true,
  subtraction: true,
  multiplication: true,
  division: true,

  additionShape: [2, 100, 2, 100],
  multiplicationShape: [2, 12, 2, 100],

  duration: 120,
};

export const isEligible = (config: GameConfig) => {
  const allAreChecked =
    config.addition &&
    config.subtraction &&
    config.multiplication &&
    config.division;

  const additionValues = config.additionShape;
  const multiplicationValues = config.multiplicationShape;

  const allAreValid =
    additionValues[0] === 2 &&
    additionValues[1] === 100 &&
    additionValues[2] === 2 &&
    additionValues[3] === 100 &&
    multiplicationValues[0] === 2 &&
    multiplicationValues[1] === 12 &&
    multiplicationValues[2] === 2 &&
    multiplicationValues[3] === 100;

  return allAreChecked && allAreValid && config.duration === 120;
};
