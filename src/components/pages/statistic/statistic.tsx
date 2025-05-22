import { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./statistic.css";
import LucideIcon from "../../components/icons/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Statistic: React.FC = () => {
  type Spent = {
    nome: string;
    valor: number;
    categoria: string;
    data: Date;
    instFinanceira: string;
  };

  type ValueGraphicInstFinanceira = {
    categoria: string;
    valor: number;
  };

  const ext: Spent[] = [
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("05/05/2025"),
      instFinanceira: "Inter",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("05/05/2025"),
      instFinanceira: "Inter",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("05/01/2025"),
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
  const [dateInit, setDateInit] = useState<Date>(new Date());
  const [dateFim, setDateFim] = useState<Date>(new Date());

  const [valueGraphic, setValueGraphic] = useState<
    ValueGraphicInstFinanceira[]
  >([]);

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

      setValueGraphic(resultFilteredGraphic());

      setItensFiltered(array);
    };

    filterInstFinanceira();
  };

  const resultFilteredGraphic = () => {
    const result = Object.entries(
      itensFiltered.reduce((acc, curr) => {
        const dataOk =
          (dateInit == new Date() || curr.data >= dateInit) &&
          (dateFim == new Date() || curr.data <= dateFim);

        console.log(dateInit, dateFim, instFinanceira, categorie);

        const instFinanceiraOk =
          instFinanceira == "Todos" || curr.instFinanceira === instFinanceira;

        const categoriaOk =
          categorie == "Todos" || curr.categoria === categorie;

        if (dataOk && instFinanceiraOk && categoriaOk) {
          if (!acc[curr.categoria]) {
            acc[curr.categoria] = 0;
          }
          acc[curr.categoria] += curr.valor;
        }

        return acc;
      }, {} as Record<string, number>)
    ).map(([categoria, valor]) => ({
      categoria,
      valor,
    }));
    return result;
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
        <ResponsiveContainer width="50%" height="50%">
          <BarChart data={valueGraphic}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis dataKey="valor" />
            <Tooltip />
            <Bar dataKey="valor" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Layout>
    </>
  );
};

export default Statistic;
