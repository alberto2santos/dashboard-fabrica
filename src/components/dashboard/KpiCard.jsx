import { Badge } from '../ui/Badge';

// eslint-disable-next-line no-unused-vars
export function KpiCard({ label, value, unit, icon: Icon, color, status }) {

  const colorMap = {
    blue:   'text-blue-400',
    green:  'text-emerald-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
  };

  const bgMap = {
    blue:   'bg-blue-500/10 border-blue-500/20',
    green:  'bg-emerald-500/10 border-emerald-500/20',
    orange: 'bg-orange-500/10 border-orange-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
  };

  const iconColorClass = colorMap[color] ?? colorMap.blue;
  const iconBgClass    = bgMap[color]    ?? bgMap.blue;

  const statusLabel =
    status === 'normal'  ? 'OK'      :
    status === 'warning' ? 'AVISO'   : 'CRÍTICO';

  return (
    <div className="card-hover flex items-center gap-4">

      <div className={`p-3 rounded-lg border ${iconBgClass} ${iconColorClass}`}>
        <Icon size={22} color="currentColor" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="text-2xl font-bold font-mono mt-0.5">
          {value ?? '—'}
          <span className="text-sm font-normal text-surface-400 ml-1">
            {unit}
          </span>
        </p>
      </div>

      <Badge level={status}>{statusLabel}</Badge>

    </div>
  );
}