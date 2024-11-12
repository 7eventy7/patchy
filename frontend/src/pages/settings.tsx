import { useTheme } from '../components/theme-provider';
import { useAccent } from '../components/accent-provider';
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
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();

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
                        onClick={() => setAccent(color.value as any)}
                        className={`h-8 w-8 rounded-full ${color.class} ${
                          accent === color.value
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
          </div>
        ))}
      </div>
    </div>
  );
}