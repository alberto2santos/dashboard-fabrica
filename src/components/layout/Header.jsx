import { useState, useEffect, useRef } from 'react';
import { useAppStore }                 from '../../store/useAppStore';
import { useWeatherData }              from '../../hooks/useWeatherData';
import { useUptime }                   from '../../hooks/useUptime';
import { exportZonesToCSV }            from '../../utils/exportCSV';
import {
  IconBell, IconSettings,
  IconTemperature, IconHumidity,
  IconCloud, IconFactory,
  IconTrash, IconDownload,
  IconActivity,
} from '../ui/icons/SensorIcons';

// ── Painel de alertas ──────────────────────────────────────
function AlertsDropdown({ alerts, onDismiss, onClose }) {
  const criticalAlerts = alerts.filter(a => a.level === 'critical');
  const warningAlerts  = alerts.filter(a => a.level === 'warning');

  const LEVEL_STYLE = {
    critical: {
      dot:  'bg-danger',
      bg:   'bg-danger/10 border-danger/20',
    },
    warning: {
      dot:  'bg-warning',
      bg:   'bg-warning/10 border-warning/20',
    },
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 z-50
                    bg-surface-900 border border-surface-700
                    rounded-2xl shadow-toast overflow-hidden
                    animate-fade-in-down">

      <div className="flex items-center justify-between
                      px-4 py-3 border-b border-surface-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-surface-100">
            Alertas Ativos
          </span>
          {alerts.length > 0 && (
            <span className="badge-danger text-2xs px-1.5 py-0.5">
              {alerts.length}
            </span>
          )}
        </div>
        {alerts.length > 0 && (
          <button
            onClick={() => { onDismiss('all'); onClose(); }}
            className="flex items-center gap-1 text-xs text-surface-500
                       hover:text-danger transition-colors"
          >
            <IconTrash size={12} />
            Limpar
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto scroll-hidden">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <span className="text-3xl">✅</span>
            <p className="text-sm text-surface-500">Nenhum alerta ativo</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-surface-800">
            {criticalAlerts.map((alert, i) => (
              <AlertRow key={`c-${i}`} alert={alert}
                style={LEVEL_STYLE.critical}
                onDismiss={() => onDismiss(i)} />
            ))}
            {warningAlerts.map((alert, i) => (
              <AlertRow key={`w-${i}`} alert={alert}
                style={LEVEL_STYLE.warning}
                onDismiss={() => onDismiss(criticalAlerts.length + i)} />
            ))}
          </div>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="px-4 py-2 border-t border-surface-800 text-center">
          <p className="text-2xs text-surface-600">
            Clique em ✕ para dispensar um alerta
          </p>
        </div>
      )}
    </div>
  );
}

function AlertRow({ alert, style, onDismiss }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border
                     border-transparent ${style.bg}
                     hover:brightness-110 transition-all`}>
      <span className={`status-dot mt-1.5 flex-shrink-0 ${style.dot}`} />
      <p className="flex-1 text-xs text-surface-300 leading-relaxed">
        {alert.message}
      </p>
      <button
        onClick={onDismiss}
        className="text-surface-600 hover:text-surface-300
                   transition-colors flex-shrink-0 text-xs"
      >
        ✕
      </button>
    </div>
  );
}

// ── Header principal ───────────────────────────────────────
export function Header() {
  const zones         = useAppStore(s => s.zones);
  const alerts        = useAppStore(s => s.alerts);
  const readings      = useAppStore(s => s.readings);
  const dismissAlert  = useAppStore(s => s.dismissAlert);
  const clearAlerts   = useAppStore(s => s.clearAlerts);
  const toggleDrawer  = useAppStore(s => s.toggleDrawer);

  const { data: weather, loading } = useWeatherData();
  const uptime = useUptime();

  const [clock,         setClock]         = useState('');
  const [alertsOpen,    setAlertsOpen]    = useState(false);
  const [bellAnimating, setBellAnimating] = useState(false);
  const [csvLoading,    setCsvLoading]    = useState(false);

  const dropdownRef  = useRef(null);
  const prevCountRef = useRef(0);

  // ── Relógio ──────────────────────────────────────────────
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('pt-BR'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Anima o sino quando chega novo alerta ────────────────
  useEffect(() => {
    if (alerts.length > prevCountRef.current) {
      setBellAnimating(true);
      setTimeout(() => setBellAnimating(false), 1000);
    }
    prevCountRef.current = alerts.length;
  }, [alerts.length]);

  // ── Fecha dropdown ao clicar fora ────────────────────────
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAlertsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleDismiss(indexOrAll) {
    if (indexOrAll === 'all') clearAlerts();
    else dismissAlert(indexOrAll);
  }

  // ── Exportar CSV ─────────────────────────────────────────
  async function handleExportCSV() {
    setCsvLoading(true);
    try {
      exportZonesToCSV(zones, readings ?? {}, alerts);
    } finally {
      setTimeout(() => setCsvLoading(false), 1500);
    }
  }

  const criticalCount = alerts.filter(a => a.level === 'critical').length;
  const alertCount    = alerts.length;

  return (
    <header className="sticky top-0 z-20 bg-surface-900/95 backdrop-blur-sm
                       border-b border-surface-800">
      <div className="max-w-screen-2xl mx-auto px-6 py-3
                      flex items-center justify-between gap-4">

        {/* ── Brand ── */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-500/10 border border-brand-500/20 rounded-lg">
            <IconFactory size={22} color="#3b82f6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-surface-100 leading-tight">
              Dashboard Industrial
            </h1>

            {/* Uptime */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="status-dot status-dot-normal" />
              <p className="text-xs text-surface-500 font-mono tabular">
                <IconActivity size={10} color="#10b981" />
                {' '}ativo há {uptime}
              </p>
            </div>
          </div>
        </div>

        {/* ── Clima externo ── */}
        {!loading && weather && (
          <div className="hidden md:flex items-center gap-4 px-4 py-2
                          bg-surface-800 rounded-xl border border-surface-700">
            <div className="flex items-center gap-1.5">
              <IconCloud size={15} color="#60a5fa" />
              <span className="text-surface-400 text-xs">Externo</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-orange-400">
                <IconTemperature size={13} />
                {weather.temperature}°C
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <IconHumidity size={13} />
                {weather.humidity}%
              </span>
              <span className="text-surface-500 text-xs">
                {weather.city}
              </span>
            </div>
          </div>
        )}

        {/* Skeleton clima */}
        {loading && (
          <div className="hidden md:flex items-center gap-2 px-4 py-2
                          bg-surface-800 rounded-xl border border-surface-700">
            <div className="skeleton w-24 h-4 rounded" />
            <div className="skeleton w-16 h-4 rounded" />
          </div>
        )}

        {/* ── Ações ── */}
        <div className="flex items-center gap-2">

          {/* Relógio */}
          <span className="font-mono text-sm text-surface-400
                           hidden sm:block tabular mr-1">
            {clock}
          </span>

          {/* Exportar CSV */}
          <button
            onClick={handleExportCSV}
            disabled={csvLoading}
            title="Exportar dados como CSV"
            className={`
              flex items-center gap-1.5 px-3 py-1.5
              rounded-lg text-xs font-medium
              border transition-all duration-200
              ${csvLoading
                ? 'bg-surface-800 text-surface-500 border-surface-700 cursor-wait'
                : 'bg-success/10 text-success border-success/25 hover:bg-success/20'
              }
            `}
          >
            <IconDownload
              size={14}
              color={csvLoading ? '#64748b' : '#10b981'}
            />
            {csvLoading ? 'Exportando...' : 'CSV'}
          </button>

          {/* Sino */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAlertsOpen(prev => !prev)}
              className={`
                relative p-2 rounded-lg transition-all duration-200
                ${alertsOpen
                  ? 'bg-surface-700 text-surface-100'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800'
                }
                ${bellAnimating ? 'animate-blink' : ''}
              `}
              aria-label="Ver alertas"
            >
              <IconBell size={20} />
              {alertCount > 0 && (
                <span className={`
                  absolute -top-1 -right-1 text-white text-xs font-bold
                  min-w-5 h-5 flex items-center justify-center rounded-full px-1
                  transition-colors duration-300
                  ${criticalCount > 0 ? 'bg-danger animate-pulse' : 'bg-warning'}
                `}>
                  {alertCount > 99 ? '99+' : alertCount}
                </span>
              )}
            </button>

            {alertsOpen && (
              <AlertsDropdown
                alerts={alerts}
                onDismiss={handleDismiss}
                onClose={() => setAlertsOpen(false)}
              />
            )}
          </div>

          {/* Configurações */}
          <button
            onClick={toggleDrawer}
            className="p-2 text-surface-400 hover:text-surface-200
                       hover:bg-surface-800 rounded-lg transition-colors"
            aria-label="Abrir configurações"
          >
            <IconSettings size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}