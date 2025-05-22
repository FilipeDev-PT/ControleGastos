import Layout from "../../components/layout/Layout";
import LucideIcon from "../../components/icons/icons";
import { useEffect, useState } from "react";
import "./extract.css";

const Extract: React.FC = () => {
  const ext: Spent[] = [
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Lazer",
      data: new Date("01/01/2021"),
      instFinanceira: "Itau",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
      instFinanceira: "Bradesco",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
      instFinanceira: "Bradesco",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Lazer",
      data: new Date("01/01/2021"),
      instFinanceira: "NuBank",
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Mercado",
      data: new Date("01/01/2021"),
      instFinanceira: "Inter",
    },
  ];

  const [valueInstFinanceira, setValueInstFinanceira] = useState<string>("");
  const [itensFiltered, setItensFiltered] = useState<Spent[]>(ext);
  const [valueCategory, setValueCategory] = useState<string>("");
  type Spent = {
    nome: string;
    valor: number;
    categoria: string;
    data: Date;
    instFinanceira: string;
  };

  const instfinanceira = ["Bradesco", "Itau", "Inter", "NuBank"];
  const category = ["Saúde", "Lazer", "Mercado", "Locomoção"];

  useEffect(() => {
    const filterInstFinanceira = () => {
      const array = ext.filter(
        (spent) =>
          (valueInstFinanceira === "" ||
            spent.instFinanceira === valueInstFinanceira) &&
          (valueCategory === "" || spent.categoria === valueCategory)
      );

      setItensFiltered(array);
    };
    filterInstFinanceira();
  }, [valueInstFinanceira, valueCategory]);

  return (
    <>
      <Layout>
        <div>
          <div>
            <div>
              instituião Financeira <LucideIcon name="ChevronDown" />
            </div>
            <div>
              {instfinanceira.map((inst, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => setValueInstFinanceira(inst)}
                    >
                      {inst}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              Categoria <LucideIcon name="ChevronDown" />
            </div>
            <div>
              {category.map((category, index) => {
                return (
                  <>
                    <div key={index} onClick={() => setValueCategory(category)}>
                      {category}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {itensFiltered.map((lançamento, index) => {
          return (
            <>
              <div key={index}>
                <h6>{lançamento.nome}</h6>
                <p>{lançamento.valor}</p>
              </div>
            </>
          );
        })}
      </Layout>
    </>
  );
};

export default Extract;
