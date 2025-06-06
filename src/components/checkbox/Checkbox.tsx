import { useState, type FC, type ReactElement } from "react";
import { Check } from "lucide-react";
import "./index.css";

export const Checkbox: FC = (): ReactElement => {
  const [rememberMe, setRememberMe] = useState(false);
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <label className="checkbox-container">
        <span>remember me</span>
        <input type="checkbox" checked={checked} />
        <span className="checkmark ">{checked && <Check />}</span>
      </label>
    </div>
  );
};
