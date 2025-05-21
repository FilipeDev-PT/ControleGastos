import { useState } from "react";
import LucideIcon from "../../../components/icons/icons";
import * as Icons from "lucide-react";
import "./inputLabel.css";

type IconName = keyof typeof Icons;

interface IInputLabel {
  name: IconName;
  type: string;
  placeholder: string;
}

const InputLabel: React.FC<IInputLabel> = ({ name, type, placeholder }) => {
  const [value, setValue] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [typePassword, setTypePassword] = useState<boolean>(false);

  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleVisibility = () => {
    setVisible(!visible);
    setTypePassword(!typePassword);
  };

  return (
    <>
      <div className="divInput">
        <LucideIcon name={name} className="iconInput" />
        <input
          type={typePassword ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={handleValueInput}
          className="inputLogin"
        />
        {type == "password" ? (
          visible ? (
            <LucideIcon
              name="EyeOff"
              className="iconInputVisible"
              onClick={handleVisibility}
            />
          ) : (
            <LucideIcon
              name="Eye"
              className="iconInputVisible"
              onClick={handleVisibility}
            />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default InputLabel;
