/**
 * alertChecker.js
 * Verifica leituras de sensores contra os limites configurados.
 * @author Alberto Luiz
 */

export const ALERT_LEVELS = {
    NORMAL: 'normal',
    WARNING: 'warning',
    CRITICAL: 'critical',
};

export function checkSensorLevel(value, limit) {
    const { min, max, warningPct } = limit;

    if (value >= max) {
        return {
            level: ALERT_LEVELS.CRITICAL,
            reason: `Valor ${value} atingiu o limite máximo (${max})`,
        };
    }

    if (value <= min) {
        return {
            level: ALERT_LEVELS.CRITICAL,
            reason: `Valor ${value} atingiu o limite mínimo (${min})`,
        };
    }

    const warningThreshold = max * (warningPct / 100);
    if (value >= warningThreshold) {
        return {
            level: ALERT_LEVELS.WARNING,
            reason: `Valor ${value} próximo do limite máximo (${warningThreshold.toFixed(1)})`,
        };
    }

    const warningMinThreshold = min + (max - min) * ((100 - warningPct) / 100);
    if (value <= warningMinThreshold && min > 0) {
        return {
            level: ALERT_LEVELS.WARNING,
            reason: `Valor ${value} próximo do limite mínimo`,
        };
    }

    return {
        level: ALERT_LEVELS.NORMAL,
        reason: null,
    };
}

export function checkReading(reading, limits, zoneName) {
    const SENSOR_LABELS = {
        temperature: 'Temperatura',
        humidity: 'Umidade',
        pressure: 'Pressão',
    };

    const SENSOR_UNITS = {
        temperature: '°C',
        humidity: '%',
        pressure: 'bar',
    };

    const results = [];

    ['temperature', 'humidity', 'pressure'].forEach(sensor => {
        const value = reading[sensor];
        const limit = limits[sensor];

        if (value === null || value === undefined) return;
        if (limit === null || limit === undefined) return;

        const { level, reason } = checkSensorLevel(value, limit);

        if (level !== ALERT_LEVELS.NORMAL) {
            results.push({
                sensor,
                level,
                value,
                message: `${zoneName} — ${SENSOR_LABELS[sensor]}: ${value}${SENSOR_UNITS[sensor]} — ${reason}`,
            });
        }
    });

    return results;
}

export function getWorstLevel(results) {
    if (results.some(r => r.level === ALERT_LEVELS.CRITICAL)) return ALERT_LEVELS.CRITICAL;
    if (results.some(r => r.level === ALERT_LEVELS.WARNING)) return ALERT_LEVELS.WARNING;
    return ALERT_LEVELS.NORMAL;
}