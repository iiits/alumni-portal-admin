import DataTable from "@/components/Commons/DataTable";
import React from "react";
import { EventsAnalytics } from "./interface";

interface EventsProps {
  events: EventsAnalytics;
}

const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Event Analytics</h2>
      <div className="grid gap-4 grid-cols-5 grid-rows-3 lg:grid-rows-1 h-full w-full">
        <div className="col-span-5 lg:col-span-2 flex lg:flex-col xl:flex-row items-center max-lg:justify-around lg:justify-center lg:gap-4 xl:justify-around">
          <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-3">
            <div className="font-bold text-6xl md:text-8xl">{events.total}</div>
            <div className="font-semibold text-base md:text-3xl mb-2">
              <span className="md:hidden block">Total Events</span>
              <div className="hidden md:block">
                <div>Total</div>
                <div>Events</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="font-bold text-4xl">{events.past}</div>
              <div className="font-medium text-sm capitalize">Past</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="font-bold text-4xl">{events.upcoming}</div>
              <div className="font-medium text-sm capitalize">Upcoming</div>
            </div>
          </div>
        </div>

        <div className="col-span-5 lg:col-span-3 row-span-2 lg:row-span-1">
          <DataTable
            data={events.nextEvents}
            heading="Upcoming Events"
            seeMoreUrl="/events"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
