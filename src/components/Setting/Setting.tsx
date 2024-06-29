"use client"
import React, { useState, ChangeEvent } from 'react';

const Setting: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [language, setLanguage] = useState<string>('en');
  const [notifications, setNotifications] = useState<boolean>(true);

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value);
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value);
  const handleNotificationsChange = (e: ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-blue-700">Theme</label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700">Language</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700">Notifications</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="mt-1 h-4 w-4 text-orange-600 border-blue-300 rounded focus:ring-orange-500"
            />
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
