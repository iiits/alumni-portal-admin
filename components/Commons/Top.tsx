"use client";

import React, { useEffect, useState } from "react";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export type TopChartProps = {
  data: Array<Record<string, any>>;
  barKey: string;
  nameKey: string;
  color?: string;
  label?: string;
  showTooltip?: boolean;
  showAxes?: boolean;
  showLegend?: boolean;
  maxItems?: number;
  height?: number;
};

const TopChart: React.FC<TopChartProps> = ({
  data,
  barKey,
  nameKey,
  color = "#6366f1",
  label = "Top",
  showTooltip = true,
  showAxes = true,
  showLegend = true,
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

  const chartData = data.slice(0, maxItems);

  const chartConfig = {
    [barKey]: { label, color },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full h-full max-h-[${height}px]`}
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={chartMargin}
        width={undefined}
        height={height}
      >
        {showAxes && (
          <XAxis type="number" dataKey={barKey} tick={{ fontSize: 14 }} />
        )}
        {showAxes && (
          <YAxis
            type="category"
            dataKey={nameKey}
            tick={{ fontSize: 14 }}
            width={screen === "mobile" ? 80 : 120}
          />
        )}

        <CartesianGrid strokeDasharray="3 3" />

        {showTooltip && (
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const item = payload[0];
              return (
                <div className="bg-background border rounded-lg px-3 py-2 shadow-xl text-sm lg:text-base">
                  {item.payload[nameKey]} - {item.value}
                </div>
              );
            }}
          />
        )}

        {showLegend && (
          <ChartLegend
            verticalAlign="top"
            content={<ChartLegendContent className={legendClass} />}
          />
        )}
        <Bar dataKey={barKey} fill={color} radius={[4, 4, 4, 4]} barSize={24} />
      </BarChart>
    </ChartContainer>
  );
};

export default TopChart;
