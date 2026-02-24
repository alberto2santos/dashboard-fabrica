import { useState }        from 'react';
import { useAppStore }     from './store/useAppStore';
import { Header }          from './components/layout/Header';
import { Sidebar }         from './components/layout/Sidebar';
import { ConfigDrawer }    from './components/layout/ConfigDrawer';
import { ZonePanel }       from './components/dashboard/ZonePanel';
import { AlertsTable }     from './components/dashboard/AlertsTable';
import { ToastContainer }  from './components/ui/Toast';

// Mapa de filtro por sensor para cada seção
const SENSOR_FILTER = {
  dashboard: null,
  alerts:    null,
  temp:      'temperature',
  humidity:  'humidity',
  pressure:  'pressure',
};

export default function App() {
  const zones        = useAppStore(s => s.zones);
  const alerts       = useAppStore(s => s.alerts);
  const dismissAlert = useAppStore(s => s.dismissAlert);

  const [activeSection, setActiveSection] = useState('dashboard');

  const recentAlerts  = alerts.slice(0, 4);
  const sensorFilter  = SENSOR_FILTER[activeSection] ?? null;

  const SECTION_TITLES = {
    dashboard: `Zonas Monitoradas — ${zones.length} ativas`,
    alerts:    'Histórico de Alertas',
    temp:      'Monitoramento — Temperatura',
    humidity:  'Monitoramento — Umidade',
    pressure:  'Monitoramento — Pressão',
  };

  return (
    <div className="min-h-screen bg-surface-950">
      <Header />
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ConfigDrawer />

      <main className="max-w-screen-2xl mx-auto px-6 py-6
                       lg:pl-24 flex flex-col gap-6">

        {/* Título da seção ativa */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-surface-400
                         uppercase tracking-wider">
            {SECTION_TITLES[activeSection]}
          </h2>

          {/* Breadcrumb de volta ao dashboard */}
          {activeSection !== 'dashboard' && (
            <button
              onClick={() => setActiveSection('dashboard')}
              className="text-xs text-brand-400 hover:text-brand-300
                         transition-colors flex items-center gap-1"
            >
              ← Voltar ao Dashboard
            </button>
          )}
        </div>

        {/* ── Vista: Alertas ── */}
        {activeSection === 'alerts' && (
          <AlertsTable />
        )}

        {/* ── Vista: Dashboard ou filtro de sensor ── */}
        {activeSection !== 'alerts' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {zones.map(zone => (
                <ZonePanel
                  key={zone.id}
                  zone={zone}
                  sensorFilter={sensorFilter}
                />
              ))}
            </div>

            {/* Tabela de alertas só no dashboard */}
            {activeSection === 'dashboard' && (
              <section>
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-surface-400
                                 uppercase tracking-wider">
                    Histórico de Alertas
                  </h2>
                </div>
                <AlertsTable />
              </section>
            )}
          </>
        )}

      </main>

      <ToastContainer alerts={recentAlerts} onDismiss={dismissAlert} />
    </div>
  );
}