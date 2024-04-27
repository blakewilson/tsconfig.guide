import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { ReactElement } from "react";

type CheckboxInputProps = {
  name: string | (() => ReactElement);
  description: string;
  checked: boolean;
  setChecked: (isChecked: boolean) => void;
};

export default function CheckboxInput({
  name,
  description,
  checked,
  setChecked,
}: CheckboxInputProps) {
  return (
    <Switch.Group as="div" className="flex items-center justify-between mb-8">
      <span className="flex flex-grow flex-col mr-4">
        <Switch.Label
          as="div"
          className="text-2xl font-medium leading-6 mb-2 text-white"
          passive
        >
          {name}
        </Switch.Label>
        <Switch.Description as="div" className="text-md text-slate-500">
          {description}
        </Switch.Description>
      </span>
      <Switch
        checked={checked}
        onChange={setChecked}
        className={classNames(
          checked ? "bg-green-400" : "bg-gray-200",
          "relative inline-flex h-9 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? "translate-x-8" : "translate-x-0",
            "pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
