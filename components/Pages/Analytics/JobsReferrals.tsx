import React from "react";

import DataTable from "@/components/Commons/DataTable";

import { JobsAnalytics, ReferralsAnalytics } from "./interface";

interface JobsReferralsProps {
  jobs: JobsAnalytics;
  referrals: ReferralsAnalytics;
}

function mergeAndSortByName(
  first: { name: string; count: number }[],
  second: { name: string; count: number }[],
) {
  const map1 = new Map(first.map((item) => [item.name, item.count]));
  const map2 = new Map(second.map((item) => [item.name, item.count]));
  const allNames = Array.from(new Set([...map1.keys(), ...map2.keys()]));

  return allNames
    .map((name) => {
      const a = map1.get(name) ?? "-";
      const b = map2.get(name) ?? "-";
      const combined = (a === "-" ? 0 : a) + (b === "-" ? 0 : b);
      return { name, jobCount: a, referralCount: b, _sort: combined };
    })
    .sort((a, b) => b._sort - a._sort)
    .map(({ name, jobCount, referralCount }) => ({
      name,
      jobCount,
      referralCount,
    }));
}

const JobsReferrals: React.FC<JobsReferralsProps> = ({ jobs, referrals }) => {
  const mergedTopCompanies = mergeAndSortByName(
    jobs.topCompanies,
    referrals.topCompanies,
  );

  const mergedTopRoles = mergeAndSortByName(jobs.topRoles, referrals.topRoles);

  const columns = [
    { key: "name", label: "Name" },
    { key: "referralCount", label: "Referral Count" },
    { key: "jobCount", label: "Job Count" },
  ];

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">
        Jobs & Referrals Analytics
      </h2>

      <div className="grid h-full w-full gap-4 grid-cols-2 grid-rows-5">
        <div className="col-span-2 row-span-1 flex justify-around items-center">
          {[
            { title: "Jobs", ...jobs },
            { title: "Referrals", ...referrals },
          ].map(({ title, total, active }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="font-bold text-4xl md:text-6xl">{total}</div>
              <div className="font-semibold text-base md:text-2xl">
                Total {title}
              </div>
              <div className="font-bold text-2xl md:text-4xl text-green-600">
                {active}
              </div>
              <div className="font-semibold text-base md:text-xl">
                Active {title}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2 lg:col-span-1 row-span-4">
          <DataTable
            data={mergedTopCompanies}
            heading="Top Companies (Jobs & Referrals)"
            seeMoreUrl="/jobs"
          />
        </div>

        <div className="col-span-2 lg:col-span-1 row-span-4">
          <DataTable
            data={mergedTopRoles}
            heading="Top Roles (Jobs & Referrals)"
            seeMoreUrl="/referrals"
          />
        </div>
      </div>
    </div>
  );
};

export default JobsReferrals;
