import { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./statistic.css";
import LucideIcon from "../../components/icons/icons";
import GraphicBar from "./graphic/graphicBar/graphicBar";
import GraphicStack from "./graphic/graphicStack/graphicStack";
import GraphicArea from "./graphic/graphicArea/graphicArea";

const Statistic: React.FC = () => {
  type Spent = {
    nome: string;
    valor: number;
    categoria: string;
    essencial: boolean;
    data: Date;
    instFinanceira: string;
  };

  const ext: Spent[] = [
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      essencial: true,
      data: new Date("05/05/2025"),
      instFinanceira: "Inter",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      essencial: true,
      data: new Date("05/05/2025"),
      instFinanceira: "Inter",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      essencial: false,
      data: new Date("04/01/2025"),
      instFinanceira: "Inter",
    },
  ];

  const instfinanceira = ["Bradesco", "Itau", "Inter", "NuBank", "Todos"];
  const category = ["Saúde", "Lazer", "Mercado", "Locomoção", "Todos"];

  const [valueInstFinanceira, setValueInstFinanceira] = useState<string>("");
  const [itensFiltered, setItensFiltered] = useState<Spent[]>(ext);
  const [valueCategory, setValueCategory] = useState<string>("");

  const [instFinanceira, setInstFinanceira] = useState<string>("Todos");
  const [categorie, setCategorie] = useState<string>("Todos");
  const [dateInit, setDateInit] = useState<Date>(
    new Date(new Date().toISOString().split("T")[0])
  );
  const [dateFim, setDateFim] = useState<Date>(
    new Date(new Date().toISOString().split("T")[0])
  );

  const handleFilterAllItens = () => {
    const filterInstFinanceira = () => {
      const array = ext.filter(
        (spent) =>
          (valueInstFinanceira === "" ||
            spent.instFinanceira === valueInstFinanceira) &&
          (valueCategory === "" || spent.categoria === valueCategory) &&
          spent.data >= dateInit &&
          spent.data <= dateFim
      );

      setItensFiltered(array);
    };

    filterInstFinanceira();
  };

  const handleValueInstFin = (value: string) => {
    setInstFinanceira(value);
    if (value == "Todos") {
      setValueInstFinanceira("");
    } else {
      setValueInstFinanceira(value);
    }
  };

  const handleValueCategory = (value: string) => {
    setCategorie(value);
    if (value == "Todos") {
      setValueCategory("");
    } else {
      setValueCategory(value);
    }
  };

  const handleChangeDateInit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setDateInit(new Date());
    } else {
      setDateInit(new Date(e.target.value));
    }
  };

  const handleChangeDateFim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setDateInit(new Date());
    } else {
      setDateFim(new Date(e.target.value));
    }
  };

  return (
    <>
      <Layout>
        <div>
          <div>
            <h4>Instituição Financeira</h4>
            <div>
              {instFinanceira} <LucideIcon name="ChevronDown" />
            </div>
            <div>
              {instfinanceira.map((inst, index) => {
                return (
                  <>
                    <div key={index} onClick={() => handleValueInstFin(inst)}>
                      {inst}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <h4>Categoria</h4>
            <div>
              {categorie} <LucideIcon name="ChevronDown" />
            </div>
            <div>
              {category.map((category, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => handleValueCategory(category)}
                    >
                      {category}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <input
              type="date"
              value={dateInit.toISOString().split("T")[0]}
              onChange={handleChangeDateInit}
            />
            <input
              type="date"
              value={dateFim.toISOString().split("T")[0]}
              onChange={handleChangeDateFim}
            />
          </div>
          <button onClick={handleFilterAllItens}>Filtrar</button>
        </div>
        {itensFiltered.map((iten) => {
          return (
            <>
              <div>{iten.nome}</div>
            </>
          );
        })}
        <div className="contentGraphic">
          <GraphicBar
            categorie={categorie}
            dateFim={dateFim}
            dateInit={dateFim}
            instFinanceira={instFinanceira}
            itensFiltered={itensFiltered}
          />
          <GraphicStack
            categorie={categorie}
            dateFim={dateFim}
            dateInit={dateFim}
            instFinanceira={instFinanceira}
            itensFiltered={itensFiltered}
          />
          <GraphicArea
            categorie={categorie}
            dateFim={dateFim}
            dateInit={dateFim}
            instFinanceira={instFinanceira}
            itensFiltered={itensFiltered}
          />
        </div>
      </Layout>
    </>
  );
};

export default Statistic;
