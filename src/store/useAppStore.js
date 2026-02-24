import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_ZONES = [
    { id: 'zone-a', name: 'Zona A', location: 'Produção' },
    { id: 'zone-b', name: 'Zona B', location: 'Armazenamento' },
    { id: 'zone-c', name: 'Zona C', location: 'Caldeiraria' },
    { id: 'zone-d', name: 'Zona D', location: 'Expedição' },
];

const DEFAULT_LIMITS = {
    temperature: { min: 0, max: 80, warningPct: 85 },
    humidity:    { min: 20, max: 90, warningPct: 85 },
    pressure:    { min: 0.5, max: 6.0, warningPct: 90 },
};

export const useAppStore = create(
    persist(
        (set, get) => ({

            // ── Zonas ──────────────────────────────────────
            zones: DEFAULT_ZONES,

            addZone: () => {
                const zones  = get().zones;
                const letter = String.fromCharCode(65 + zones.length);
                set({
                    zones: [
                        ...zones,
                        {
                            id:       `zone-${Date.now()}`,
                            name:     `Zona ${letter}`,
                            location: 'Nova Zona',
                        },
                    ],
                });
            },

            removeZone: (id) =>
                set({ zones: get().zones.filter(z => z.id !== id) }),

            updateZone: (id, fields) =>
                set({
                    zones: get().zones.map(z =>
                        z.id === id ? { ...z, ...fields } : z
                    ),
                }),

            // ── Localização da fábrica (clima externo) ─────
            factoryLocation: {
                city:      'São Paulo, SP',
                latitude:  -23.5505,
                longitude: -46.6333,
            },

            setFactoryLocation: (location) =>
                set({ factoryLocation: location }),

            // ── Limites dos sensores ────────────────────────
            limits: DEFAULT_LIMITS,

            updateLimit: (sensor, field, value) =>
                set({
                    limits: {
                        ...get().limits,
                        [sensor]: {
                            ...get().limits[sensor],
                            [field]: Number(value),
                        },
                    },
                }),

            resetLimits: () => set({ limits: DEFAULT_LIMITS }),

            // ── Configurações gerais ────────────────────────
            refreshInterval: 3000,
            setRefreshInterval: (ms) => set({ refreshInterval: Number(ms) }),

            // ── Leituras atuais por zona ───────────────────
            readings: {},

            setReading: (zoneId, data) =>
                set({
                    readings: {
                        ...get().readings,
                        [zoneId]: data,
                    },
                }),

            // ── Alertas ativos ─────────────────────────────
            alerts: [],

            addAlert: (alert) =>
                set({
                    alerts: [
                        { ...alert, id: Date.now(), timestamp: new Date() },
                        ...get().alerts,
                    ].slice(0, 100),
                }),

            clearAlerts:   () => set({ alerts: [] }),

            dismissAlert: (id) =>
                set({ alerts: get().alerts.filter(a => a.id !== id) }),

            // ── Drawer de config ───────────────────────────
            drawerOpen:    false,
            toggleDrawer:  () => set({ drawerOpen: !get().drawerOpen }),
        }),
        {
            name: 'dashboard-fabrica-config',
            partialize: (state) => ({
                zones:           state.zones,
                limits:          state.limits,
                refreshInterval: state.refreshInterval,
            }),
        }
    )
);