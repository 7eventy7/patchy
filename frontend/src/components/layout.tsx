import { Link, useLocation } from 'react-router-dom';
import { ListIcon, Clock, Settings2Icon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAccent } from './accent-provider';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { accent } = useAccent();

  const navigation = [
    { name: 'Timeline', href: '/', icon: Clock },
    { name: 'Catalog', href: '/list', icon: ListIcon },
    { name: 'Settings', href: '/settings', icon: Settings2Icon },
  ];

  // Update favicon when accent changes
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', `/logo-${accent.charAt(0)}.svg`);
    }
  }, [accent]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center gap-2">
              <div className="h-8 w-8 text-primary">
                <img 
                  src={`/logo-${accent.charAt(0)}.svg`}
                  alt="Patchy Logo" 
                  className="h-full w-full"
                />
              </div>
              <h1 className="text-2xl font-bold text-primary">Patchy</h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={cn(
                              'flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="pl-72 w-full">
          <div className="px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}