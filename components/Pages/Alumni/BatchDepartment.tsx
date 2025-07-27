import React from "react";

import StatsChartMin from "@/components/Commons/StatsChartMin";
import { ByBatch, ByDepartment } from "./interface";

interface BatchDepartmentProps {
  byBatch: ByBatch[];
  byDepartment: ByDepartment[];
}

const BatchDepartment: React.FC<BatchDepartmentProps> = ({
  byBatch,
  byDepartment,
}) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">
        Batch & Department Overview
      </h2>
      <div className="grid h-full w-full gap-4 grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <StatsChartMin
            data={byBatch}
            xKey="batch"
            xLabel="Batch"
            yLabel="Count"
            height={200}
          />
        </div>
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <StatsChartMin
            data={byDepartment}
            xKey="department"
            xLabel="Department"
            yLabel="Count"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default BatchDepartment;
