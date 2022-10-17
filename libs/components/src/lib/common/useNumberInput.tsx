import { Tuple } from '@levi-math/common';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

export const useNumberInput = (defaultValue = 0) => {
  const [value, setValue] = useState(defaultValue);

  const numberInput = <NumberInput value={value} onChange={setValue} />;

  return [numberInput, value] as const;
};

export const useMultiNumberInput = <TLength extends number>(
  quantity = 1 as TLength,
  defaultValue = Array.from({ length: quantity }, () => 0) as Tuple<
    number,
    TLength
  >,
  className?: string
) => {
  const [values, setValue] = useState<Tuple<number, TLength>>(defaultValue);

  const updateIndex = useCallback(
    (index: number, newValue: number) => {
      const newValueArray = values.slice() as Tuple<number, TLength>;
      newValueArray[index] = newValue;
      setValue(newValueArray);
    },
    [values]
  );

  const numberInputs = Array.from({ length: quantity }).map((_, idx) => (
    <NumberInput
      key={idx}
      value={values[idx]}
      onChange={(next) => updateIndex(idx, next)}
      className={className}
    />
  ));

  return [numberInputs, values] as const;
};

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const NumberInput = ({
  value,
  onChange,
  className,
}: NumberInputProps) => {
  return (
    <input
      className={classNames(className)}
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      type="number"
    />
  );
};
