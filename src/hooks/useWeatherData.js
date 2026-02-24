import { useState, useEffect } from 'react';
import { fetchWeather }        from '../services/weatherService';
import { useAppStore }         from '../store/useAppStore';

export function useWeatherData() {
  const factoryLocation = useAppStore(s => s.factoryLocation);

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const weather = await fetchWeather(factoryLocation);
        setData(weather);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [factoryLocation]);

  return { data, loading, error };
}