import { useState, useEffect, useCallback, useRef } from 'react';
import { getNextReading, generateHistory }           from '../utils/sensorSimulator';
import { checkReading, getWorstLevel }               from '../utils/alertChecker';
import { useAppStore }                               from '../store/useAppStore';

export function useSensorData(zoneId) {
  const refreshInterval = useAppStore(s => s.refreshInterval);
  const limits          = useAppStore(s => s.limits);
  const addAlert        = useAppStore(s => s.addAlert);
  const setReading      = useAppStore(s => s.setReading);
  const zones           = useAppStore(s => s.zones);
  const zone            = zones.find(z => z.id === zoneId);

  const [history, setHistory] = useState(() => generateHistory(zoneId));
  const [current, setCurrent] = useState(() => generateHistory(zoneId).at(-1));
  const [status,  setStatus]  = useState('normal');

  const alertCooldown = useRef({});

  const processAlerts = useCallback((reading) => {
    const results = checkReading(reading, limits, zone?.name ?? zoneId);
    const worst   = getWorstLevel(results);

    setStatus(worst);

    results.forEach(alert => {
      const now      = Date.now();
      const cooldown = 15000;
      const key      = `${zoneId}-${alert.sensor}`;

      if (!alertCooldown.current[key]) {
        alertCooldown.current[key] = 0;
      }

      if (now - alertCooldown.current[key] > cooldown) {
        addAlert({ ...alert, zone: zone?.name ?? zoneId });
        alertCooldown.current[key] = now;
      }
    });
  }, [limits, addAlert, zone, zoneId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const reading = getNextReading(zoneId);
      setCurrent(reading);
      setHistory(prev => [...prev.slice(-59), reading]);
      processAlerts(reading);
      setReading(zoneId, reading);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [zoneId, refreshInterval, processAlerts, setReading]);

  return { current, history, status };
}