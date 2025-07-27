import React from "react";

import DataTable from "@/components/Commons/DataTable";
import TopChart from "@/components/Commons/Top";
import { ReferralsAnalytics } from "./interface";

interface TopProps {
  referrals: ReferralsAnalytics;
}

const TopReferrals: React.FC<TopProps> = ({ referrals }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Top Referrals</h2>

      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={referrals.topCompanies}
          barKey="count"
          nameKey="name"
          color="#6366f1"
          label="Top Companies"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={referrals.topRoles}
          barKey="count"
          nameKey="name"
          color="#6366f1"
          label="Top Roles"
        />
      </div>
      <DataTable
        data={referrals.topPosters}
        heading="Top Referral Posters"
        seeMoreUrl="/referrals"
      />
    </div>
  );
};

export default TopReferrals;
