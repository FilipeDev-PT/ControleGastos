import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./home.css";

const Home: React.FC = () => {
  type Spent = {
    nome: string;
    valor: number;
    categoria: string;
    data: Date;
  };
  const [extLast, setExtLast] = useState<Spent[]>([]);

  const ext: Spent[] = [
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("01/01/2021"),
    },
    {
      nome: "Academia",
      valor: 124.32,
      categoria: "Saúde",
      data: new Date("05/21/2025"),
    },
  ];

  useEffect(() => {
    const filteredSpent = () => {
      const date = new Date();
      date.setDate(date.getDate() - 2);
      const extLast2days = ext.filter((spent) => spent.data >= date);
      setExtLast(extLast2days);
    };
    filteredSpent();
  }, []);

  return (
    <>
      <Layout>
        {extLast.map((spent, index) => {
          return (
            <>
              <div key={index}>
                <p>Valor: {spent.valor}</p>
              </div>
            </>
          );
        })}
      </Layout>
    </>
  );
};

export default Home;
