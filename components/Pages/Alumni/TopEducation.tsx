import MultiTopChart from "@/components/Commons/MultiTopChart";
import React from "react";
import { Education } from "./interface";

interface TopProps {
  education: Education;
}

const TopEducation: React.FC<TopProps> = ({ education }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Top Education</h2>

      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={education.all.topSchools}
          ongoing={education.ongoing.topSchools}
          label="Top Schools"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={education.all.topDegrees}
          ongoing={education.ongoing.topDegrees}
          label="Top Degrees"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={education.all.topFields}
          ongoing={education.ongoing.topFields}
          label="Top Fields"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={education.all.topLocations}
          ongoing={education.ongoing.topLocations}
          label="Top Locations"
        />
      </div>
    </div>
  );
};

export default TopEducation;
