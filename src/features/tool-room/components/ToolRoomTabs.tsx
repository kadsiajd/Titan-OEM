import { Cog, Factory, Warehouse } from 'lucide-react';

const TABS = [
  { id: 'capabilities', label: 'Capabilities', icon: Factory },
  { id: 'machinery', label: 'Machinery', icon: Cog },
  { id: 'infrastructure', label: 'Infrastructure', icon: Warehouse },
];

export function ToolRoomTabs() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container-page flex items-center justify-center gap-4 py-4 sm:gap-8 lg:gap-12">
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === 0;

          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`flex items-center gap-2 border-b-2 pb-1 text-sm font-medium ${
                isActive
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
