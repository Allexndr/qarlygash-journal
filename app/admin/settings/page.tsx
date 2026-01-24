import { getSiteSettings } from "@/lib/db";
import { Save } from "lucide-react";
import { MotionDiv } from "@/components/MotionDiv";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Settings</h1>
          <p className="text-gray-500 mt-2">Manage global site configuration</p>
        </div>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input
              type="text"
              defaultValue={settings.siteName}
              name="siteName"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Description (SEO)</label>
            <textarea
              defaultValue={settings.siteDescription}
              name="siteDescription"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Save size={20} className="mr-2" />
              Save Settings
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4 italic">
            * Note: This is a demo form. In a full implementation, this should connect to a settings API route.
          </p>
        </form>
      </MotionDiv>
    </div>
  );
}
