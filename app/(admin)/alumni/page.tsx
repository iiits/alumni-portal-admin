import Alumni from "@/components/Pages/Alumni/Alumni";

export default function AlumniPage() {
  return (
    <div className="h-screen overflow-y-auto p-6">
      <h1 className="lg:mb-2 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        Alumni Dashboard
      </h1>
      <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
        Track and analyze key metrics about alumni, their engagements, verify
        registration requests, and manage alumni profiles.
      </p>
      <hr className="border-t border-gray-200 dark:border-gray-700 mb-8" />
      <Alumni />
    </div>
  );
}
