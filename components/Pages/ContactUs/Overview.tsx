import React from "react";
import { ContactUsAnalytics } from "./interface";

interface OverviewProps {
  contacts: ContactUsAnalytics;
}

const Overview: React.FC<OverviewProps> = ({ contacts }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Queries Overview</h2>

      <div className="grid max-md:grid-rows-2 grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
        <div className="max-md:col-span-2 flex flex-col md:flex-row items-center md:items-end md:gap-3">
          <div className="font-bold text-6xl md:text-8xl">{contacts.total}</div>
          <div className="font-semibold text-base md:text-3xl mb-2 text-center">
            <span className="md:hidden block">Total Queries</span>
            <div className="hidden md:block">
              <div>Total</div>
              <div>Queries</div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col md:flex-row items-center md:items-end md:gap-3">
          <div className="font-bold text-6xl md:text-8xl">
            {contacts.resolved}
          </div>
          <div className="font-semibold text-base md:text-3xl mb-2 text-center">
            <span className="md:hidden block">Resolved Queries</span>
            <div className="hidden md:block">
              <div>Resolved</div>
              <div>Queries</div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col md:flex-row items-center md:items-end md:gap-3">
          <div className="font-bold text-6xl md:text-8xl">
            {contacts.unresolved}
          </div>
          <div className="font-semibold text-base md:text-3xl mb-2 text-center">
            <span className="md:hidden block">Unresolved Queries</span>
            <div className="hidden md:block">
              <div>Unresolved</div>
              <div>Queries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
