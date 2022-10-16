import { GameConfig } from './game-config';
import { default as MathEval } from 'math-expression-evaluator';

const nextQuestion = (cfg: GameConfig) => {
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
    operations[Math.floor(Math.random() * operations.length)];

  if (selectedOperation === '*' || selectedOperation === '/') {
    const [lhsLow, lhsHigh, rhsLow, rhsHigh] = multiplicationShape;

    const lhs = Math.floor(Math.random() * (lhsHigh - lhsLow + 1)) + lhsLow;
    const rhs = Math.floor(Math.random() * (rhsHigh - rhsLow + 1)) + rhsLow;
    if (selectedOperation === '*') {
      const solution = MathEval.eval(`${lhs} ${selectedOperation} ${rhs}`);

      return {
        lhs,
        rhs,
        op: selectedOperation,
        solution,
      };
    } else {
      const product = MathEval.eval(`${lhs} * ${rhs}`);
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

    const lhs = Math.floor(Math.random() * (lhsHigh - lhsLow + 1)) + lhsLow;
    const rhs = Math.floor(Math.random() * (rhsHigh - rhsLow + 1)) + rhsLow;

    if (selectedOperation === '+') {
      const solution = MathEval.eval(`${lhs} ${selectedOperation} ${rhs}`);

      return {
        lhs,
        rhs,
        op: selectedOperation,
        solution,
      };
    } else {
      const sum = MathEval.eval(`${lhs} + ${rhs}`);
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

export const Maths = {
  nextQuestion,
};
