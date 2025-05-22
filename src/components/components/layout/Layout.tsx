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
            <ButtonHeader text="Inicio" redirect="Home" />
            <ButtonHeader text="Extrato" redirect="Extract" />
            <ButtonHeader text="Fatura" redirect="" />
            <ButtonHeader text="Estatistica" redirect="" />
            <ButtonHeader text="Cadastros" redirect="Registers" />
          </div>
          <div className="divContentInfo">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
