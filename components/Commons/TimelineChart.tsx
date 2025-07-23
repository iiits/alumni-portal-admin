"use client";

import React, { useEffect, useState } from "react";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Area, AreaChart, Brush, CartesianGrid, XAxis, YAxis } from "recharts";

export type TimelineChartProps = {
  data: Array<Record<string, any>>;
  lines: Array<{ key: string; color?: string; label?: string }>;
  showTooltip?: boolean;
  showGraph?: boolean;
  showAxes?: boolean;
  showBrush?: boolean;
  xKey?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
};

const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  lines,
  showTooltip = true,
  showGraph = true,
  showAxes = true,
  showBrush = false,
  xKey = "date",
  xLabel = "Date",
  yLabel = "Value",
  height = 300,
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

  const xTickFormatter = (tick: string, idx: number) => {
    if (screen === "mobile") return "";
    if (
      (screen === "md" || screen === "lg") &&
      data.length > 5 &&
      idx % 3 !== 0
    )
      return "";
    if (data.length > 7 && idx % 2 !== 0) return "";
    return tick;
  };

  const chartMargin =
    screen === "mobile"
      ? { top: 0, right: 20, left: 0, bottom: 0 }
      : screen === "md"
        ? { top: 0, right: 30, left: 5, bottom: 0 }
        : { top: 0, right: 50, left: 10, bottom: 0 };

  const chartConfig = Object.fromEntries(
    lines.map((l) => [l.key, { label: l.label || l.key, color: l.color }]),
  );

  return (
    <ChartContainer
      config={chartConfig}
      className={`w-full h-full max-h-[${height}px]`}
    >
      <AreaChart data={data} margin={chartMargin}>
        {showGraph && <CartesianGrid strokeDasharray="3 3" />}

        {showAxes && (
          <XAxis
            dataKey={xKey}
            tickFormatter={xTickFormatter}
            label={{
              value: xLabel,
              position: "insideBottom",
              offset: 10,
              style: { fontSize: 14 },
            }}
            height={screen === "mobile" ? 30 : 50}
            tick={{ fontSize: 14 }}
          />
        )}
        {showAxes && (
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 14 },
            }}
            tick={{ fontSize: 14 }}
          />
        )}

        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}

        <ChartLegend
          verticalAlign="top"
          content={<ChartLegendContent className={legendClass} />}
        />

        {/* Gradients for each area */}
        <defs>
          {lines.map((l, idx) => (
            <linearGradient
              key={l.key}
              id={`color-${l.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={l.color || "#8884d8"}
                stopOpacity={0.7}
              />
              <stop
                offset="95%"
                stopColor={l.color || "#8884d8"}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>

        {lines.map((l) => (
          <Area
            key={l.key}
            type="monotone"
            dataKey={l.key}
            stroke={l.color || "#8884d8"}
            fill={`url(#color-${l.key})`}
            fillOpacity={1}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}

        {showBrush && <Brush dataKey={xKey} height={30} stroke="#8884d8" />}
      </AreaChart>
    </ChartContainer>
  );
};

export default TimelineChart;
