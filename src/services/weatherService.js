const BASE_URL     = 'https://api.open-meteo.com/v1/forecast';
const GEOCODE_URL  = 'https://geocoding-api.open-meteo.com/v1/search';

/**
 * Busca sugestões de cidades pelo nome.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    name:     query.trim(),
    count:    6,
    language: 'pt',
    format:   'json',
  });

  const res  = await fetch(`${GEOCODE_URL}?${params}`);
  if (!res.ok) throw new Error(`Erro geocoding: ${res.status}`);

  const data = await res.json();

  // Formata os resultados
  return (data.results ?? []).map(city => ({
    name:      city.name,
    state:     city.admin1 ?? '',
    country:   city.country ?? '',
    latitude:  city.latitude,
    longitude: city.longitude,
    // Label exibida no dropdown
    label: [city.name, city.admin1, city.country]
      .filter(Boolean)
      .join(', '),
  }));
}

/**
 * Busca clima atual pelas coordenadas.
 * @param {{ city, latitude, longitude }} location
 * @returns {Promise<object>}
 */
export async function fetchWeather(location) {
  const params = new URLSearchParams({
    latitude:        location.latitude,
    longitude:       location.longitude,
    current:         'temperature_2m,relative_humidity_2m,surface_pressure,weather_code,wind_speed_10m',
    wind_speed_unit: 'ms',
    timezone:        'auto',
  });

  const res  = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`Erro clima: ${res.status}`);

  const data = await res.json();
  const c    = data.current;

  return {
    temperature: c.temperature_2m,
    humidity:    c.relative_humidity_2m,
    pressure:    parseFloat((c.surface_pressure / 100).toFixed(2)),
    windSpeed:   c.wind_speed_10m,
    city:        location.city,
    updatedAt:   new Date(),
  };
}