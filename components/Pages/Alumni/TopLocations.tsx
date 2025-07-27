import React from "react";

import TopChart from "@/components/Commons/Top";
import { Locations } from "./interface";

interface TopProps {
  locations: Locations;
}

const TopLocations: React.FC<TopProps> = ({ locations }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Top Locations</h2>

      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={locations.topCities}
          barKey="count"
          nameKey="_id"
          color="#6366f1"
          label="Top Companies"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={locations.topCountries}
          barKey="count"
          nameKey="_id"
          color="#6366f1"
          label="Top Roles"
        />
      </div>
    </div>
  );
};

export default TopLocations;
