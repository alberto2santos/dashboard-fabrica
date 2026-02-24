import { useAppStore } from '../../store/useAppStore';
import {
  IconFactory,
  IconAlert,
  IconTemperature,
  IconHumidity,
  IconPressure,
} from '../ui/icons/SensorIcons';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',   icon: IconFactory     },
  { id: 'alerts',    label: 'Alertas',     icon: IconAlert       },
  { id: 'temp',      label: 'Temperatura', icon: IconTemperature },
  { id: 'humidity',  label: 'Umidade',     icon: IconHumidity    },
  { id: 'pressure',  label: 'Pressão',     icon: IconPressure    },
];

export function Sidebar({ onSectionChange, activeSection }) {
  const alerts        = useAppStore(s => s.alerts);
  const criticalCount = alerts.filter(a => a.level === 'critical').length;

  return (
    <aside className="hidden lg:flex flex-col w-16 bg-surface-900
                      border-r border-surface-800 fixed left-0 top-0
                      h-full z-10 pt-20 pb-6 items-center gap-2">

      {NAV_ITEMS.map((item) => {
        const NavIcon  = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            title={item.label}
            onClick={() => onSectionChange(item.id)}
            className={`
              relative group p-3 rounded-xl
              transition-all duration-200 w-10 h-10
              flex items-center justify-center
              ${isActive
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                : 'text-surface-500 hover:text-surface-100 hover:bg-surface-800'
              }
            `}
          >
            <NavIcon size={18} color="currentColor" />

            {/* Badge alertas críticos */}
            {item.id === 'alerts' && criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white
                               text-xs font-bold min-w-4 h-4
                               flex items-center justify-center rounded-full px-1">
                {criticalCount > 9 ? '9+' : criticalCount}
              </span>
            )}

            {/* Tooltip */}
            <span className="absolute left-14 bg-surface-800 text-surface-200
                             text-xs px-2 py-1 rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100
                             pointer-events-none transition-opacity duration-200
                             border border-surface-700 shadow-lg z-50">
              {item.label}
            </span>
          </button>
        );
      })}

    </aside>
  );
}