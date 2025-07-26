"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type SimpleStatsChartProps = {
  data: Array<any>;
  barKeys: Array<{ key: string; color?: string; label?: string }>;
  xKey: string;
  xLabel?: string;
  yLabel?: string;
  showBrush?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showAxes?: boolean;
  height?: number;
};

const SimpleStatsChart: React.FC<SimpleStatsChartProps> = ({
  data,
  barKeys,
  xKey,
  xLabel = "Category",
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
      <BarChart data={data} margin={chartMargin} height={height}>
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
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 14 },
            }}
            tick={{ fontSize: 14 }}
          />
        )}
        <CartesianGrid strokeDasharray="3 3" />

        {showTooltip && (
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;
              const d = data.find((item) => item[xKey] === label);
              return (
                <div className="bg-background border rounded-lg px-3 py-2 shadow-xl text-xs lg:text-base">
                  <div className="font-semibold">
                    {xLabel}: {label}
                  </div>
                  {barKeys.map((b) => (
                    <div key={b.key}>
                      {b.label || b.key}: {d?.[b.key] ?? 0}
                    </div>
                  ))}
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
            endIndex={Math.min(data.length - 1, 6)}
          />
        )}
      </BarChart>
    </ChartContainer>
  );
};

export default SimpleStatsChart;
