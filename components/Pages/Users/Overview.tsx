import React from "react";

import TimelineChart from "@/components/Commons/TimelineChart";

import DataTable from "@/components/Commons/DataTable";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Overview as OverviewI, Unverified } from "./interface";

interface OverviewProps {
  users: OverviewI;
  unverified: Unverified;
}

function getGrowthColor(rate: number) {
  if (rate > 0) return "text-green-600";
  if (rate < 0) return "text-red-600";
  return "text-blue-600";
}

function getGrowthColorBg(rate: number) {
  if (rate > 0) return "bg-emerald-200";
  if (rate < 0) return "bg-pink-200";
  return "bg-indigo-200";
}

function getGrowthIcon(rate: number) {
  if (rate > 0) return <ArrowUp className="inline w-5 h-5" />;
  if (rate < 0) return <ArrowDown className="inline w-5 h-5" />;
  return <Minus className="inline w-5 h-5" />;
}

const Overview: React.FC<OverviewProps> = ({ users, unverified }) => {
  const growthCards = [
    {
      label: "1 Day",
      value: users.growth["1d"].count,
      rate: users.growth["1d"].rate,
    },
    {
      label: "7 Days",
      value: users.growth["7d"].count,
      rate: users.growth["7d"].rate,
    },
    {
      label: "30 Days",
      value: users.growth["30d"].count,
      rate: users.growth["30d"].rate,
    },
  ];

  const roleData = Object.entries(users.byRole).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">User Overview</h2>
      <div className="grid h-full w-full gap-4 grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-2">
        <div className="row-span-1 xl:row-span-2 col-span-2 xl:col-span-1 grid h-full w-full gap-4 grid-cols-3 lg:grid-cols-7 xl:grid-cols-3">
          <div className="col-span-3 lg:col-span-4 xl:col-span-3 row-span-1 flex items-center justify-around gap-4">
            <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-3">
              <div className="text-7xl md:text-8xl font-bold">
                {users.total}
              </div>
              <div className="text-base md:text-3xl font-semibold mb-2">
                <span className="block md:hidden">Total Users</span>
                <div className="hidden md:block">
                  <div>Total</div>
                  <div>Users</div>
                </div>
              </div>
            </div>

            {roleData.map((role, idx) => (
              <div
                key={role.name}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="text-4xl font-bold">{role.value}</div>
                <div className="text-sm font-medium capitalize">
                  {role.name}
                </div>
              </div>
            ))}
          </div>

          {growthCards.map((g, idx) => (
            <div
              key={g.label}
              className={`whitespace-nowrap col-span-1 row-span-1 py-2 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl md:text-3xl ${getGrowthColorBg(g.rate)}`}
            >
              <span>
                {g.value}{" "}
                <span
                  className={`text-base font-medium ${getGrowthColor(g.rate)}`}
                >
                  {getGrowthIcon(g.rate)} {g.rate}%
                </span>
              </span>
              <span className="text-base">in {g.label}</span>
            </div>
          ))}
        </div>

        <div className="row-span-1 xl:row-span-2 col-span-2 xl:col-span-1">
          <DataTable
            data={unverified.users}
            heading="Unverified Users"
            seeMoreUrl="/users"
          />
        </div>
      </div>

      <div className="rounded-lg shadow-sm p-4 min-h-fit h-[400px]">
        <div className="mb-2 font-semibold">User Growth (24hr Timeline)</div>
        <TimelineChart
          data={users.timeline["1d"]}
          lines={[{ key: "count", color: "#6366f1", label: "Users" }]}
          xKey="date"
          xLabel="Hours"
          yLabel="Users"
          height={250}
          showAxes={true}
          showBrush={true}
        />
      </div>

      <div className="rounded-lg shadow-sm p-4 min-h-fit h-[400px]">
        <div className="mb-2 font-semibold">User Growth (30d Timeline)</div>
        <TimelineChart
          data={users.timeline["30d"]}
          lines={[{ key: "count", color: "#6366f1", label: "Users" }]}
          xKey="date"
          xLabel="Date"
          yLabel="Users"
          height={250}
          showAxes={true}
          showBrush={true}
        />
      </div>
    </div>
  );
};

export default Overview;
