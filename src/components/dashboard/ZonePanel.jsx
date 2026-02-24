import { useSensorData }  from '../../hooks/useSensorData';
import { KpiCard }        from './KpiCard';
import { SensorChart }    from './SensorChart';
import { Badge }          from '../ui/Badge';
import {
  IconTemperature,
  IconHumidity,
  IconPressure,
} from '../ui/icons/SensorIcons';

const SENSOR_CONFIG = [
  {
    key:   'temperature',
    label: 'Temperatura',
    unit:  '°C',
    icon:  IconTemperature,
    color: 'orange',
    chart: '#f97316',
  },
  {
    key:   'humidity',
    label: 'Umidade',
    unit:  '%',
    icon:  IconHumidity,
    color: 'blue',
    chart: '#3b82f6',
  },
  {
    key:   'pressure',
    label: 'Pressão',
    unit:  'bar',
    icon:  IconPressure,
    color: 'purple',
    chart: '#a855f7',
  },
];

const STATUS_LABEL = {
  normal:   'Normal',
  warning:  'Atenção',
  critical: 'Crítico',
};

export function ZonePanel({ zone, sensorFilter }) {
  const { current, history, status } = useSensorData(zone.id);

  // Se tem filtro, mostra só o sensor filtrado
  const sensors = sensorFilter
    ? SENSOR_CONFIG.filter(s => s.key === sensorFilter)
    : SENSOR_CONFIG;

  return (
    <div className={`
      card flex flex-col gap-4
      transition-all duration-300
      ${status === 'critical' ? 'border-danger/50 shadow-danger/10 shadow-lg' : ''}
      ${status === 'warning'  ? 'border-warning/40' : ''}
    `}>

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-surface-100">{zone.name}</h3>
          <p className="text-xs text-surface-500 mt-0.5">{zone.location}</p>
        </div>
        <Badge level={status}>{STATUS_LABEL[status]}</Badge>
      </div>

      {/* KPI cards */}
      <div className="flex flex-col gap-2">
        {sensors.map(sensor => (
          <KpiCard
            key={sensor.key}
            label={sensor.label}
            value={current?.[sensor.key]?.toFixed(sensor.key === 'pressure' ? 2 : 1)}
            unit={sensor.unit}
            icon={sensor.icon}
            color={sensor.color}
            status={status}
          />
        ))}
      </div>

      {/* Gráfico — sensor filtrado ou temperatura por padrão */}
      <div>
        <p className="text-xs text-surface-500 mb-1 uppercase tracking-wider">
          {sensorFilter
            ? `${sensors[0]?.label} — Histórico`
            : 'Temperatura — Histórico'
          }
        </p>
        <SensorChart
          history={history}
          sensor={sensorFilter ?? 'temperature'}
          color={sensors[0]?.chart ?? '#f97316'}
        />
      </div>

    </div>
  );
}