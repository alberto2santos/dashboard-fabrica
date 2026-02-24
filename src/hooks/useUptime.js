/**
 * useUptime.js
 * Retorna o tempo decorrido desde que o dashboard foi iniciado.
 */

import { useState, useEffect, useRef } from 'react';

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  }
  if (m > 0) {
    return `${m}m ${String(s).padStart(2, '0')}s`;
  }
  return `${s}s`;
}

export function useUptime() {
  const startRef              = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    startRef.current = Date.now();
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return formatUptime(elapsed);
}