import Users from "@/components/Pages/Users/Users";

export default function UserPage() {
  return (
    <div className="h-screen overflow-y-auto p-4">
      <h1 className="lg:mb-2 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        Users Dashboard
      </h1>
      <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
        Track and analyze key metrics about users, thier engagements and manage
        user profiles.
      </p>
      <hr className="border-t border-gray-200 dark:border-gray-700 mb-8" />
      <Users />
    </div>
  );
}
