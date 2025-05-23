import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./graphicStack.css";
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
  valorEssencial: number;
  valorNoEssencial: number;
};

const GraphicStack: React.FC<IGraphic> = ({
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

  const resultFilteredGraphic = (): ValueGraphicInstFinanceira[] => {
    const result = Object.entries(
      itensFiltered.reduce((acc, curr) => {
        const dataHoje = new Date(new Date().toISOString().split("T")[0]);

        const dataOk =
          (dateInit.getTime() === dataHoje.getTime() ||
            curr.data >= dateInit) &&
          (dateFim.getTime() === dataHoje.getTime() || curr.data <= dateFim);

        const instFinanceiraOk =
          instFinanceira === "Todos" || curr.instFinanceira === instFinanceira;

        const categoriaOk =
          categorie === "Todos" || curr.categoria === categorie;

        if (dataOk && instFinanceiraOk && categoriaOk) {
          if (!acc[curr.categoria]) {
            acc[curr.categoria] = {
              valorEssencial: 0,
              valorNoEssencial: 0,
            };
          }

          if (curr.essencial) {
            acc[curr.categoria].valorEssencial += curr.valor;
          } else {
            acc[curr.categoria].valorNoEssencial += curr.valor;
          }
        }

        return acc;
      }, {} as Record<string, { valorEssencial: number; valorNoEssencial: number }>)
    ).map(([categoria, valores]) => ({
      categoria,
      valorEssencial: valores.valorEssencial,
      valorNoEssencial: valores.valorNoEssencial,
    }));

    return result;
  };

  return (
    <>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart data={valueGraphic}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="valorEssencial"
            stackId="a"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="valorNoEssencial"
            stackId="a"
            fill="#82ca9d"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default GraphicStack;
