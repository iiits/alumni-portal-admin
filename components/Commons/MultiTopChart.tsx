import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export interface MultiTopChartProps {
  all: Array<{ _id: string; count: number }>;
  ongoing: Array<{ _id: string; count: number }>;
  label?: string;
  colorAll?: string;
  colorOngoing?: string;
  maxItems?: number;
  height?: number;
}

const MultiTopChart: React.FC<MultiTopChartProps> = ({
  all,
  ongoing,
  label = "Top",
  colorAll = "#6366f1",
  colorOngoing = "#f59e42",
  maxItems = 10,
  height = 350,
}) => {
  const [screen, setScreen] = useState<"mobile" | "md" | "lg" | "xl">("xl");
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 768) setScreen("mobile");
      else if (w < 1280) setScreen("md");
      else if (w < 1536) setScreen("lg");
      else setScreen("xl");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Merge all and ongoing by _id
  const merged = Array.from(
    new Set([...all.map((a) => a._id), ...ongoing.map((o) => o._id)]),
  )
    .map((_id) => ({
      _id,
      all: all.find((a) => a._id === _id)?.count || 0,
      ongoing: ongoing.find((o) => o._id === _id)?.count || 0,
    }))
    .sort((a, b) => b.all + b.ongoing - (a.all + a.ongoing))
    .slice(0, maxItems);

  const legendClass =
    screen === "mobile"
      ? "text-xs"
      : screen === "md"
        ? "text-sm"
        : screen === "lg"
          ? "text-base"
          : "text-lg";

  const chartMargin =
    screen === "mobile"
      ? { top: 0, right: 20, left: 0, bottom: 0 }
      : { top: 0, right: 30, left: 10, bottom: 0 };

  const chartConfig = {
    all: { label: `${label} (All)`, color: colorAll },
    ongoing: { label: `${label} (Ongoing)`, color: colorOngoing },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full h-full max-h-[${height}px]`}
    >
      <BarChart
        data={merged}
        layout="vertical"
        margin={chartMargin}
        width={undefined}
        height={height}
      >
        <XAxis type="number" tick={{ fontSize: 14 }} />
        <YAxis
          type="category"
          dataKey="_id"
          tick={{ fontSize: 14 }}
          width={screen === "mobile" ? 80 : 120}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const item = payload[0];
            return (
              <div className="bg-background border rounded-lg px-3 py-2 shadow-xl text-sm lg:text-base">
                {item.payload._id} - All: {item.payload.all}, Ongoing:{" "}
                {item.payload.ongoing}
              </div>
            );
          }}
        />
        <ChartLegend
          verticalAlign="top"
          content={<ChartLegendContent className={legendClass} />}
        />
        <Bar dataKey="all" fill={colorAll} radius={[4, 4, 4, 4]} barSize={18} />
        <Bar
          dataKey="ongoing"
          fill={colorOngoing}
          radius={[4, 4, 4, 4]}
          barSize={18}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default MultiTopChart;
