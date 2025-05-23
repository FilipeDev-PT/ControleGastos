import Category from "../popUps/category/category";
import ContainerPopUps from "../popUps/components/container";
import InstFinan from "../popUps/instFinan/instFinan";
import Spent from "../popUps/spent/spent";
import ButtonHeader from "./buttonsHeader/buttonHeader";
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
            <ButtonHeader text="Inicio" redirect="../Home" />
            <ButtonHeader text="Extrato" redirect="../Extract" />
            <ButtonHeader text="Estatistica" redirect="../Statistic" />
            <ButtonHeader text="Cadastros" redirect="Registers" />
          </div>
          <div className="divContentInfo">{children}</div>
        </div>
      </div>
      <ContainerPopUps>
        <Spent />
        <InstFinan />
        <Category />
      </ContainerPopUps>
    </>
  );
};

export default Layout;
