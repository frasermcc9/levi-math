import { Switch as SwitchBase } from '@headlessui/react';
import classnames from 'classnames';
import { useState } from 'react';

export const useSwitch = (defaultValue = false) => {
  const [checked, setChecked] = useState(defaultValue);

  const SwitchComponent = <Switch checked={checked} onChange={setChecked} />;

  return [SwitchComponent, checked] as const;
};

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <div className="py-2">
      <SwitchBase
        checked={checked}
        onChange={onChange}
        className={classnames(
          {
            'bg-cyan-700': checked,
            'bg-cyan-500': !checked,
          },
          'relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classnames(
            {
              'translate-x-5': checked,
              'translate-x-0': !checked,
            },
            'pointer-events-none inline-block h-[16px] w-[15px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
          )}
        />
      </SwitchBase>
    </div>
  );
};
