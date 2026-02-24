import { useAppStore }  from '../../store/useAppStore';
import { Badge }        from '../ui/Badge';
import { IconX }        from '../ui/icons/SensorIcons';

const SENSOR_LABELS = {
  temperature: 'Temperatura',
  humidity:    'Umidade',
  pressure:    'Pressão',
};

export function AlertsTable() {
  const alerts       = useAppStore(s => s.alerts);
  const dismissAlert = useAppStore(s => s.dismissAlert);
  const clearAlerts  = useAppStore(s => s.clearAlerts);

  if (alerts.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-surface-500 text-sm">Nenhum alerta registrado.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-surface-100">Histórico de Alertas</h3>
        <button
          onClick={clearAlerts}
          className="text-xs text-surface-500 hover:text-danger transition-colors"
        >
          Limpar tudo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-surface-500 text-xs uppercase tracking-wider border-b border-surface-800">
              <th className="pb-2 pr-4">Hora</th>
              <th className="pb-2 pr-4">Zona</th>
              <th className="pb-2 pr-4">Sensor</th>
              <th className="pb-2 pr-4">Valor</th>
              <th className="pb-2 pr-4">Nível</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800">
            {alerts.slice(0, 20).map(alert => (
              <tr key={alert.id} className="hover:bg-surface-800/50 transition-colors">
                <td className="py-2 pr-4 font-mono text-xs text-surface-400">
                  {new Date(alert.timestamp).toLocaleTimeString('pt-BR')}
                </td>
                <td className="py-2 pr-4 text-surface-200">{alert.zone}</td>
                <td className="py-2 pr-4 text-surface-300">
                  {SENSOR_LABELS[alert.sensor] ?? alert.sensor}
                </td>
                <td className="py-2 pr-4 font-mono text-surface-200">
                  {alert.value?.toFixed(2)}
                </td>
                <td className="py-2 pr-4">
                  <Badge level={alert.level}>
                    {alert.level === 'critical' ? 'CRÍTICO' : 'AVISO'}
                  </Badge>
                </td>
                <td className="py-2">
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-surface-600 hover:text-surface-300 transition-colors"
                  >
                    <IconX size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}