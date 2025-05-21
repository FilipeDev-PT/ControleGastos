import Layout from "../../components/layout/Layout";
import "./home.css";

const Home: React.FC = () => {
  const ext = [
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
    {
      nome: "Academia",
      valor: "R$ 124,32",
      Categoria: "Saúde",
      data: "01/01/2021",
    },
  ];
  return (
    <>
      <Layout>
        {ext.map((lançamento, index) => {
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

export default Home;
