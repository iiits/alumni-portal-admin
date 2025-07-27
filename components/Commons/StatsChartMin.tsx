"use client";

import React, { useEffect, useState } from "react";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type StatsChartProps = {
  data: Array<any>;
  barKeys?: Array<{ key: string; color?: string; label?: string }>;
  xKey?: string;
  xLabel?: string;
  yLabel?: string;
  showBrush?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showAxes?: boolean;
  height?: number;
};

const defaultBarKeys = [
  { key: "total", color: "#6366f1", label: "Total" },
  { key: "alumni", color: "#fbbf24", label: "Alumni" },
  { key: "growthRate", color: "#f87171", label: "Growth Rate (%)" },
];

const StatsChart: React.FC<StatsChartProps> = ({
  data,
  barKeys = defaultBarKeys,
  xKey = "batch",
  xLabel = "Batch",
  yLabel = "Count",
  showBrush = true,
  showTooltip = true,
  showLegend = true,
  showAxes = true,
  height = 400,
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

  const chartData = data.map((d) => ({
    ...d,
    admin: d.byRole.admin,
    alumni: d.byRole.alumni,
    student: d.byRole.student,
    growthRate: d.growth.rate,
  }));

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

  const chartConfig = Object.fromEntries(
    barKeys.map((b) => [b.key, { label: b.label, color: b.color }]),
  );

  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full h-full max-h-[${height}px]`}
    >
      <BarChart data={chartData} margin={chartMargin} height={height}>
        {showAxes && (
          <XAxis
            dataKey={xKey}
            label={{
              value: xLabel,
              position: "insideBottom",
              offset: 10,
              style: { fontSize: 14 },
            }}
            height={50}
            tick={{ fontSize: 14 }}
          />
        )}
        {showAxes && (
          <YAxis
            yAxisId="left"
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 14 },
            }}
            tick={{ fontSize: 14 }}
          />
        )}
        {showAxes && (
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Growth Rate (%)",
              angle: 90,
              position: screen === "mobile" ? "center" : "insideRight",
              style: { fontSize: screen === "mobile" ? 12 : 14 },
            }}
            tick={{ fontSize: 14 }}
            domain={[0, 100]}
          />
        )}
        <CartesianGrid strokeDasharray="3 3" />

        {showTooltip && (
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;
              const d = chartData.find((item) => item[xKey] === label);
              return (
                <div className="bg-background border rounded-lg px-3 py-2 shadow-xl text-xs lg:text-base">
                  <div className="font-semibold">Batch: {label}</div>
                  <div>Total: {d.total}</div>
                  <div>Alumni: {d.alumni}</div>
                  <div>Growth Rate: {d.growthRate}%</div>
                </div>
              );
            }}
          />
        )}

        {showLegend && (
          <ChartLegend
            verticalAlign="top"
            content={
              <ChartLegendContent
                className={`${legendClass} flex-wrap ${screen === "mobile" ? "flex-row flex-wrap gap-y-2" : ""}`}
              />
            }
          />
        )}

        {barKeys.map((b) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            fill={b.color}
            yAxisId={b.key === "growthRate" ? "right" : "left"}
            barSize={24}
            radius={[4, 4, 4, 4]}
          ></Bar>
        ))}

        {showBrush && (
          <Brush
            dataKey={xKey}
            height={30}
            stroke="#6366f1"
            startIndex={0}
            endIndex={Math.min(chartData.length - 1, 6)}
          />
        )}
      </BarChart>
    </ChartContainer>
  );
};

export default StatsChart;
