import Layout from "../../components/layout/Layout";
import LucideIcon from "../../components/icons/icons";
import { useEffect, useState } from "react";
import "./extract.css";

const Extract: React.FC = () => {
  type Spent = {
    nome: string;
    valor: number;
    categoria: string;
    data: Date;
    instFinanceira: string;
  };

  const ext: Spent[] = [
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("01/01/2021"),
      instFinanceira: "Inter",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("01/01/2021"),
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

  const [visibleCount, setVisibleCount] = useState(10);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight * 0.9) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gastosVisiveis = itensFiltered.slice(0, visibleCount);

  useEffect(() => {
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
  }, [valueInstFinanceira, valueCategory, dateInit, dateFim]);

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
        </div>
        <div>
          {gastosVisiveis.map((lançamento, index) => {
            return (
              <>
                <div key={index}>
                  <h5>Titulo: {lançamento.nome}</h5>
                  <p>Inst: {lançamento.instFinanceira}</p>
                  <p>Categoria: {lançamento.categoria}</p>
                  <p>Valor: R$ {lançamento.valor}</p>
                </div>
              </>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Extract;
