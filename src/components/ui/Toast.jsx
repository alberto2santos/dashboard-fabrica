import { useEffect, useState } from 'react';
import { IconX, IconAlert } from './icons/SensorIcons';

export function Toast({ alert, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrada suave
    requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss em 6s
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(alert.id), 300);
    }, 6000);

    return () => clearTimeout(timer);
  }, [alert.id, onDismiss]);

  const isCritical = alert.level === 'critical';

  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-xl border shadow-xl
      transition-all duration-300 w-80
      ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      ${isCritical
        ? 'bg-danger/10 border-danger/40 text-danger'
        : 'bg-warning/10 border-warning/40 text-warning'}
    `}>
      <IconAlert size={18} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight">
          {isCritical ? 'CRÍTICO' : 'AVISO'}
        </p>
        <p className="text-xs opacity-80 mt-0.5 leading-snug">
          {alert.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(alert.id)}
        className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <IconX size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ alerts, onDismiss }) {
  // Mostra só os 4 alertas mais recentes
  const recent = alerts.slice(0, 4);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {recent.map(alert => (
        <Toast key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
}