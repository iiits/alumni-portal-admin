import React from "react";

import { ReferralsAnalytics } from "./interface";

interface OverviewProps {
  referrals: ReferralsAnalytics;
}

const Overview: React.FC<OverviewProps> = ({ referrals }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Referrals Overview</h2>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="w-full lg:w-1/4 flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-3">
            <div className="font-bold text-6xl md:text-8xl">
              {referrals.totalReferrals}
            </div>
            <div className="font-semibold text-base md:text-3xl mb-2 text-center">
              <span className="md:hidden block">Total Referrals</span>
              <div className="hidden md:block">
                <div>Total</div>
                <div>Referrals</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{referrals.pastPosts}</div>
            <div className="font-medium text-sm capitalize">Expired Posts</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{referrals.futurePosts}</div>
            <div className="font-medium text-sm capitalize">Ongoing Posts</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">
              {referrals.uniqueCompanies}
            </div>
            <div className="font-medium text-sm capitalize">
              Unique Companies
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{referrals.uniqueRoles}</div>
            <div className="font-medium text-sm capitalize">Unique Roles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
