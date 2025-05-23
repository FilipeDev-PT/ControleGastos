import { useEffect, useState } from "react";
import "./graphicArea.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  mes: string;
  valorEssencial: number;
  valorNoEssencial: number;
};

const GraphicArea: React.FC<IGraphic> = ({
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
        const dataOk =
          (dateInit.getTime() ===
            new Date(new Date().toISOString().split("T")[0]).getTime() ||
            curr.data >= dateInit) &&
          (dateFim.getTime() ===
            new Date(new Date().toISOString().split("T")[0]).getTime() ||
            curr.data <= dateFim);

        const instFinanceiraOk =
          instFinanceira === "Todos" || curr.instFinanceira === instFinanceira;

        const categoriaOk =
          categorie === "Todos" || curr.categoria === categorie;

        if (dataOk && instFinanceiraOk && categoriaOk) {
          const mes = `${curr.data.getFullYear()}-${String(
            curr.data.getMonth() + 1
          ).padStart(2, "0")}`;

          if (!acc[mes]) {
            acc[mes] = { valorEssencial: 0, valorNoEssencial: 0 };
          }

          if (curr.essencial) {
            acc[mes].valorEssencial += curr.valor;
          } else {
            acc[mes].valorNoEssencial += curr.valor;
          }
        }

        return acc;
      }, {} as Record<string, { valorEssencial: number; valorNoEssencial: number }>)
    ).map(([mes, valores]) => ({
      mes,
      valorEssencial: valores.valorEssencial,
      valorNoEssencial: valores.valorNoEssencial,
    }));

    return result;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={valueGraphic}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="valorEssencial"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="valorNoEssencial"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default GraphicArea;
