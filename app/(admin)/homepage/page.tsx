import HomePageCMS from "@/components/Pages/HomepageCMS/HomePageCMS";

export default function CMSPage() {
  return (
    <div className="h-screen overflow-y-auto p-4">
      <h1 className="lg:mb-2 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        Homepage CMS
      </h1>
      <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
        Edit and manage the content displayed on the homepage, including
        testimonials, gallery images, and other key sections.
      </p>
      <hr className="border-t border-gray-200 dark:border-gray-700 mb-8" />
      <HomePageCMS />
    </div>
  );
}
