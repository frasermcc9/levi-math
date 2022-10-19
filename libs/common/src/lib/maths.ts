import { GameConfig } from './game-config';
import { default as MathEval } from 'math-expression-evaluator';

interface GeneratorOptions {
  useRandom?: () => number;
}

const nextQuestion = (cfg: GameConfig, options?: GeneratorOptions) => {
  const nextRandom = options?.useRandom ?? Math.random;

  const {
    addition,
    additionShape,
    division,
    multiplication,
    multiplicationShape,
    subtraction,
  } = cfg;

  const operations = [
    ...(addition ? ['+'] : []),
    ...(division ? ['/'] : []),
    ...(multiplication ? ['*'] : []),
    ...(subtraction ? ['-'] : []),
  ];

  const selectedOperation =
    operations[Math.floor(nextRandom() * operations.length)];

  if (selectedOperation === '*' || selectedOperation === '/') {
    const [lhsLow, lhsHigh, rhsLow, rhsHigh] = multiplicationShape;

    const lhs = Math.floor(nextRandom() * (lhsHigh - lhsLow + 1)) + lhsLow;
    const rhs = Math.floor(nextRandom() * (rhsHigh - rhsLow + 1)) + rhsLow;
    if (selectedOperation === '*') {
      const solution = MathEval.eval(`${lhs} ${selectedOperation} ${rhs}`);

      return {
        lhs,
        rhs,
        op: selectedOperation,
        solution,
      };
    } else {
      const product = lhs * rhs;
      return {
        lhs: product,
        rhs: lhs,
        op: selectedOperation,
        solution: rhs,
      };
    }
  }

  if (selectedOperation === '+' || selectedOperation === '-') {
    const [lhsLow, lhsHigh, rhsLow, rhsHigh] = additionShape;

    const lhs = Math.floor(nextRandom() * (lhsHigh - lhsLow + 1)) + lhsLow;
    const rhs = Math.floor(nextRandom() * (rhsHigh - rhsLow + 1)) + rhsLow;

    if (selectedOperation === '+') {
      const solution = MathEval.eval(`${lhs} ${selectedOperation} ${rhs}`);

      return {
        lhs,
        rhs,
        op: selectedOperation,
        solution,
      };
    } else {
      const sum = lhs + rhs;
      return {
        lhs: sum,
        rhs: lhs,
        op: selectedOperation,
        solution: rhs,
      };
    }
  }

  throw new Error('Invalid operation');
};

const solve = (lhs: number, op: string, rhs: number) => {
  return MathEval.eval(`${lhs} ${op} ${rhs}`);
};

export const Maths = {
  nextQuestion,
  solve,
};
