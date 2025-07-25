import React from "react";

import TimelineChart from "@/components/Commons/TimelineChart";

import { LoginsAnalytics } from "./interface";

interface LoginsProps {
  logins: LoginsAnalytics;
}

const Logins: React.FC<LoginsProps> = ({ logins }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">
        Login Analytics ({logins.activeUsers} Active Users Now)
      </h2>
      <div className="grid h-full w-full gap-4 grid-cols-2 grid-rows-2">
        <div className="col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 rounded-lg p-4 shadow-sm">
          <TimelineChart
            data={logins.timeline["1d"]}
            lines={[{ key: "count", color: "#6366f1", label: "Users" }]}
            xKey="date"
            xLabel="Time (Last 24hrs)"
            yLabel="Users"
            height={200}
            showAxes={true}
            showBrush={true}
          />
        </div>

        <div className="col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 rounded-lg p-4 shadow-sm">
          <TimelineChart
            data={logins.timeline["30d"]}
            lines={[{ key: "count", color: "#6366f1", label: "Users" }]}
            xKey="date"
            xLabel="Date"
            yLabel="Users"
            height={200}
            showAxes={true}
            showBrush={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Logins;
