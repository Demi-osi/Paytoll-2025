"use client";

import { useState } from "react";
import { Section } from "@/components/craft";

type NotificationPreferences = {
  emailUpdates: boolean;
  smsAlerts: boolean;
  appNotifications: boolean;
  newsletter: boolean;
};

export default function ManageNotificationsPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailUpdates: true,
    smsAlerts: false,
    appNotifications: true,
    newsletter: false,
  });

  const handleToggle = (preference: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  return (
    <Section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Manage Notifications</h1>
        <p className="text-gray-600 text-center mb-8">
          Customize your notification preferences
        </p>

        <div className="space-y-6">
          {/* Email Updates */}
          <div className="flex items-center justify-between">
            <label className="text-gray-800 font-semibold">Email Updates</label>
            <button
              onClick={() => handleToggle("emailUpdates")}
              className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition ${
                preferences.emailUpdates ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {preferences.emailUpdates ? "On" : "Off"}
            </button>
          </div>

          {/* SMS Alerts */}
          <div className="flex items-center justify-between">
            <label className="text-gray-800 font-semibold">SMS Alerts</label>
            <button
              onClick={() => handleToggle("smsAlerts")}
              className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition ${
                preferences.smsAlerts ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {preferences.smsAlerts ? "On" : "Off"}
            </button>
          </div>

          {/* App Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-gray-800 font-semibold">App Notifications</label>
            <button
              onClick={() => handleToggle("appNotifications")}
              className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition ${
                preferences.appNotifications ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {preferences.appNotifications ? "On" : "Off"}
            </button>
          </div>

          {/* Newsletter */}
          <div className="flex items-center justify-between">
            <label className="text-gray-800 font-semibold">Newsletter Subscription</label>
            <button
              onClick={() => handleToggle("newsletter")}
              className={`px-4 py-2 font-semibold rounded-lg focus:outline-none transition ${
                preferences.newsletter ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {preferences.newsletter ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Preferences saved!")}
            className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Section>
  );
}
