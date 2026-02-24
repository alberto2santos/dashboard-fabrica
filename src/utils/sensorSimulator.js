/**
 * Simula leituras realistas de sensores industriais
 * com variação gradual e ruído controlado.
 */

const SENSOR_PROFILES = {
  temperature: {
    base:  42,
    drift: 0.3,
    noise: 0.8,
    unit:  '°C',
  },
  humidity: {
    base:  55,
    drift: 0.2,
    noise: 0.5,
    unit:  '%',
  },
  pressure: {
    base:  2.4,
    drift: 0.05,
    noise: 0.08,
    unit:  'bar',
  },
};

// Estado interno de cada sensor por zona
const sensorState = {};

/**
 * Inicializa o estado de uma zona com valores base + variação aleatória.
 */
function initZone(zoneId) {
  sensorState[zoneId] = {
    temperature: SENSOR_PROFILES.temperature.base + (Math.random() - 0.5) * 20,
    humidity:    SENSOR_PROFILES.humidity.base    + (Math.random() - 0.5) * 20,
    pressure:    SENSOR_PROFILES.pressure.base    + (Math.random() - 0.5) * 1.5,
  };
}

/**
 * Retorna uma nova leitura com drift + ruído para uma zona.
 * @param {string} zoneId
 * @returns {{ temperature: number, humidity: number, pressure: number }}
 */
export function getNextReading(zoneId) {
  if (!sensorState[zoneId]) initZone(zoneId);

  const state = sensorState[zoneId];

  Object.keys(SENSOR_PROFILES).forEach(sensor => {
    const { drift, noise, base } = SENSOR_PROFILES[sensor];

    // Drift: tende lentamente de volta ao valor base
    const meanReversion = (base - state[sensor]) * 0.02;
    const randomDrift   = (Math.random() - 0.5) * drift * 2;
    const randomNoise   = (Math.random() - 0.5) * noise * 2;

    state[sensor] = parseFloat(
      (state[sensor] + meanReversion + randomDrift + randomNoise).toFixed(2)
    );
  });

  return { ...state, timestamp: new Date() };
}

/**
 * Gera histórico inicial para preencher os gráficos ao carregar.
 * @param {string} zoneId
 * @param {number} points
 */
export function generateHistory(zoneId, points = 30) {
  if (!sensorState[zoneId]) initZone(zoneId);

  return Array.from({ length: points }, (_, i) => ({
    ...getNextReading(zoneId),
    timestamp: new Date(Date.now() - (points - i) * 3000),
  }));
}

export { SENSOR_PROFILES };