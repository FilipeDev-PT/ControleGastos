import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./graphicBar.css";
import { useEffect, useState } from "react";

interface IGraphic {
  itensFiltered: Spent[];
  dateInit: Date;
  dateFim: Date;
  instFinanceira: string;
  categorie: string;
}

type Spent = {
  nome: string;
  valor: number;
  categoria: string;
  essencial: boolean;
  data: Date;
  instFinanceira: string;
};

type ValueGraphicInstFinanceira = {
  categoria: string;
  valor: number;
};

const GraphicBar: React.FC<IGraphic> = ({
  itensFiltered,
  dateInit,
  dateFim,
  instFinanceira,
  categorie,
}) => {
  const [valueGraphic, setValueGraphic] = useState<
    ValueGraphicInstFinanceira[]
  >([]);

  useEffect(() => {
    setValueGraphic(resultFilteredGraphic());
  }, [itensFiltered]);

  const resultFilteredGraphic = () => {
    const result = Object.entries(
      itensFiltered.reduce((acc, curr) => {
        const dataOk =
          (dateInit.getTime() ==
            new Date(new Date().toISOString().split("T")[0]).getTime() ||
            curr.data >= dateInit) &&
          (dateFim.getTime() ==
            new Date(new Date().toISOString().split("T")[0]).getTime() ||
            curr.data <= dateFim);

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

  return (
    <>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart data={valueGraphic}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis dataKey="valor" />
          <Tooltip />
          <Bar dataKey="valor" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default GraphicBar;
