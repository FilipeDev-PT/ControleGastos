import ButtonHeader from "../buttonsHeader/buttonHeader";
import "./Layout.css";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <div className="ContainerLayout">
        <div className="divContentGeral">
          <div className="divHeader">
            <ButtonHeader text="Extrato" redirect="" />
            <ButtonHeader text="Extrato" redirect="" />
            <ButtonHeader text="Extrato" redirect="" />
          </div>
          <div className="divContentInfo">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
