import { useState }    from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CitySearch } from '../ui/CitySearch';
import {
  IconChevronRight,
  IconChevronLeft,
  IconPlus,
  IconTrash,
  IconEdit,
  IconRefresh,
} from '../ui/icons/SensorIcons';

const SENSORS = [
  { key: 'temperature', label: 'Temperatura', unit: '°C'  },
  { key: 'humidity',    label: 'Umidade',     unit: '%'   },
  { key: 'pressure',    label: 'Pressão',     unit: 'bar' },
];

export function ConfigDrawer() {
  // ── Store ──────────────────────────────────────────────
  const drawerOpen         = useAppStore(s => s.drawerOpen);
  const toggleDrawer       = useAppStore(s => s.toggleDrawer);
  const zones              = useAppStore(s => s.zones);
  const addZone            = useAppStore(s => s.addZone);
  const removeZone         = useAppStore(s => s.removeZone);
  const updateZone         = useAppStore(s => s.updateZone);
  const limits             = useAppStore(s => s.limits);
  const updateLimit        = useAppStore(s => s.updateLimit);
  const resetLimits        = useAppStore(s => s.resetLimits);
  const refreshInterval    = useAppStore(s => s.refreshInterval);
  const setRefreshInterval = useAppStore(s => s.setRefreshInterval);
  const factoryLocation    = useAppStore(s => s.factoryLocation);
  const setFactoryLocation = useAppStore(s => s.setFactoryLocation);

  // ── Estado local ───────────────────────────────────────
  const [editingZone, setEditingZone] = useState(null);

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={toggleDrawer}
        />
      )}

      {/* Botão toggle lateral */}
      <button
        onClick={toggleDrawer}
        className={`
          fixed top-1/2 -translate-y-1/2 z-50
          bg-brand-600 hover:bg-brand-500
          text-white rounded-l-xl p-2
          transition-all duration-300 shadow-lg
          ${drawerOpen ? 'right-96' : 'right-0'}
        `}
        aria-label={drawerOpen ? 'Fechar configurações' : 'Abrir configurações'}
      >
        {drawerOpen
          ? <IconChevronRight size={18} />
          : <IconChevronLeft  size={18} />
        }
      </button>

      {/* Drawer */}
      <aside className={`
        fixed top-0 right-0 h-full w-96 z-40
        bg-surface-900 border-l border-surface-800
        overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 flex flex-col gap-8">

          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-100">Configurações</h2>
            <button
              onClick={toggleDrawer}
              className="text-surface-500 hover:text-surface-200 transition-colors"
            >
              <IconChevronRight size={20} />
            </button>
          </div>

          {/* ── Localização da Fábrica ── */}
            <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
                Localização da Fábrica
            </h3>
            <div className="bg-surface-800 rounded-lg p-4 flex flex-col gap-3">

                {/* Busca com autocomplete */}
                <CitySearch
                value={factoryLocation.city}
                onSelect={(city) => setFactoryLocation({
                    city:      city.label,
                    latitude:  city.latitude,
                    longitude: city.longitude,
                })}
                />

                {/* Exibe as coordenadas selecionadas (somente leitura) */}
                <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-surface-500">Latitude</span>
                    <div className="bg-surface-700/50 border border-surface-600/50
                                    rounded-lg px-3 py-1.5 text-sm
                                    font-mono text-surface-400">
                    {factoryLocation.latitude}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-surface-500">Longitude</span>
                    <div className="bg-surface-700/50 border border-surface-600/50
                                    rounded-lg px-3 py-1.5 text-sm
                                    font-mono text-surface-400">
                    {factoryLocation.longitude}
                    </div>
                </div>
                </div>

                <p className="text-xs text-surface-600">
                Selecione a cidade para atualizar automaticamente as coordenadas
                e o clima externo.
                </p>
            </div>
            </section>

          {/* ── Gerenciar Zonas ── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
                Zonas
              </h3>
              <button
                onClick={addZone}
                className="flex items-center gap-1.5 text-xs text-brand-400
                           hover:text-brand-300 transition-colors"
              >
                <IconPlus size={14} />
                Adicionar
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {zones.map(zone => (
                <div
                  key={zone.id}
                  className="bg-surface-800 rounded-lg p-3 flex items-center gap-3"
                >
                  {editingZone === zone.id ? (
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        autoFocus
                        defaultValue={zone.name}
                        placeholder="Nome da zona"
                        onBlur={e => {
                          updateZone(zone.id, { name: e.target.value });
                          setEditingZone(null);
                        }}
                        className="bg-surface-700 border border-surface-600 rounded-lg
                                   px-3 py-1.5 text-sm text-surface-100 w-full
                                   focus:outline-none focus:border-brand-500"
                      />
                      <input
                        defaultValue={zone.location}
                        placeholder="Localização"
                        onBlur={e => updateZone(zone.id, { location: e.target.value })}
                        className="bg-surface-700 border border-surface-600 rounded-lg
                                   px-3 py-1.5 text-sm text-surface-400 w-full
                                   focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-100 truncate">
                        {zone.name}
                      </p>
                      <p className="text-xs text-surface-500 truncate">
                        {zone.location}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingZone(
                        editingZone === zone.id ? null : zone.id
                      )}
                      className="p-1.5 text-surface-500 hover:text-brand-400
                                 transition-colors rounded"
                    >
                      <IconEdit size={14} />
                    </button>
                    <button
                      onClick={() => removeZone(zone.id)}
                      disabled={zones.length <= 1}
                      className="p-1.5 text-surface-500 hover:text-danger
                                 transition-colors rounded
                                 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Limites dos Sensores ── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
                Limites dos Sensores
              </h3>
              <button
                onClick={resetLimits}
                className="flex items-center gap-1.5 text-xs text-surface-500
                           hover:text-surface-300 transition-colors"
              >
                <IconRefresh size={12} />
                Resetar
              </button>
            </div>

            {SENSORS.map(sensor => (
              <div
                key={sensor.key}
                className="bg-surface-800 rounded-lg p-4 flex flex-col gap-3"
              >
                <p className="text-sm font-medium text-surface-200">
                  {sensor.label} ({sensor.unit})
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-surface-500">Mínimo</span>
                    <input
                      type="number"
                      value={limits[sensor.key].min}
                      onChange={e => updateLimit(sensor.key, 'min', e.target.value)}
                      className="bg-surface-700 border border-surface-600 rounded-lg
                                 px-3 py-1.5 text-sm text-surface-100
                                 focus:outline-none focus:border-brand-500"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-surface-500">Máximo</span>
                    <input
                      type="number"
                      value={limits[sensor.key].max}
                      onChange={e => updateLimit(sensor.key, 'max', e.target.value)}
                      className="bg-surface-700 border border-surface-600 rounded-lg
                                 px-3 py-1.5 text-sm text-surface-100
                                 focus:outline-none focus:border-brand-500"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="text-xs text-surface-500">
                    Aviso em {limits[sensor.key].warningPct}% do máximo
                  </span>
                  <input
                    type="range"
                    min="50" max="99" step="1"
                    value={limits[sensor.key].warningPct}
                    onChange={e => updateLimit(sensor.key, 'warningPct', e.target.value)}
                    className="accent-brand-500"
                  />
                </label>
              </div>
            ))}
          </section>

          {/* ── Intervalo de Atualização ── */}
          <section className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
              Atualização
            </h3>
            <div className="bg-surface-800 rounded-lg p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-surface-400">Intervalo</span>
                <span className="font-mono text-brand-400">
                  {refreshInterval / 1000}s
                </span>
              </div>
              <input
                type="range"
                min="1000" max="10000" step="1000"
                value={refreshInterval}
                onChange={e => setRefreshInterval(e.target.value)}
                className="accent-brand-500"
              />
              <div className="flex justify-between text-xs text-surface-600">
                <span>1s</span>
                <span>10s</span>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}