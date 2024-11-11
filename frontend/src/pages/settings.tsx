import { useState } from 'react';
import { useTheme } from '../components/theme-provider';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';

interface ColorSchemeOption {
  value: 'light' | 'dark' | 'system';
  label: string;
  icon: typeof SunIcon;
}

const colorSchemeOptions: ColorSchemeOption[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
];

const accentColors = [
  { name: 'Default Purple', value: 'purple', class: 'bg-[hsl(248,90%,66%)]' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { name: 'Green', value: 'green', class: 'bg-green-500' },
  { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
  { name: 'Red', value: 'red', class: 'bg-red-500' },
];

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize how Patchy looks on your device',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how you want to be notified about updates',
  },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [selectedAccentColor, setSelectedAccentColor] = useState('purple');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [updateInterval, setUpdateInterval] = useState('30');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and application settings
        </p>
      </div>

      <div className="space-y-8">
        {settingsSections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>

            {section.id === 'appearance' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color scheme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorSchemeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`flex items-center justify-center gap-2 rounded-md border border-border p-2 text-sm ${
                            theme === option.value
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background hover:bg-accent'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Accent color</label>
                  <div className="flex gap-2">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedAccentColor(color.value)}
                        className={`h-8 w-8 rounded-full ${color.class} ${
                          selectedAccentColor === color.value
                            ? 'ring-2 ring-primary ring-offset-2'
                            : ''
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {section.id === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">
                      Enable notifications
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when new releases are available
                    </p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notificationsEnabled ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-background transition-transform ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Update interval</label>
                  <select
                    value={updateInterval}
                    onChange={(e) => setUpdateInterval(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2"
                  >
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                    <option value="360">Every 6 hours</option>
                    <option value="720">Every 12 hours</option>
                    <option value="1440">Every 24 hours</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}