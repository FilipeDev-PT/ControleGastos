import { useNavigate } from "react-router-dom";
import "./buttonHeader.css";

interface IButtonHeader {
  text: string;
  redirect: string;
}

const ButtonHeader: React.FC<IButtonHeader> = ({ text, redirect }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="divButtonHeader"
        onClick={() => navigate(`./${redirect}`)}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonHeader;
