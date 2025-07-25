import Analytics from "@/components/Pages/Analytics/Analytics";

export default function AnalyticsPage() {
  return (
    <div className="h-screen overflow-y-auto p-4">
      <h1 className="lg:mb-2 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        Key Analytics
      </h1>
      <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
        Track and analyze key metrics about users, alumni, events, and other
        engagements on the platform.
      </p>
      <hr className="border-t border-gray-200 dark:border-gray-700 mb-8" />
      <Analytics />
    </div>
  );
}
