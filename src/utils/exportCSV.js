/**
 * exportCSV.js
 * Exporta leituras dos sensores por zona em formato CSV.
 * @author Alberto Luiz
 */

const HEADERS = [
  'Zona',
  'Localização',
  'Temperatura (°C)',
  'Umidade (%)',
  'Pressão (bar)',
  'Status',
  'Data/Hora',
];

function formatDate(date) {
  return new Date(date).toLocaleString('pt-BR', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Converte array de objetos em string CSV.
 * @param {Array} zones     - Zonas do store
 * @param {Object} readings - Leituras atuais { [zoneId]: { temperature, humidity, pressure } }
 * @param {Array} alerts    - Alertas ativos
 */
export function exportZonesToCSV(zones, readings, alerts) {
  const rows = zones.map(zone => {
    const reading   = readings[zone.id] ?? {};
    const hasAlert  = alerts.some(a => a.zoneId === zone.id);
    const status    = hasAlert
      ? alerts.find(a => a.zoneId === zone.id)?.level ?? 'normal'
      : 'normal';

    return [
      zone.name,
      zone.location,
      reading.temperature?.toFixed(1) ?? '-',
      reading.humidity?.toFixed(1)    ?? '-',
      reading.pressure?.toFixed(2)    ?? '-',
      status,
      formatDate(new Date()),
    ];
  });

  const csvContent = [
    HEADERS.join(';'),
    ...rows.map(row => row.join(';')),
  ].join('\n');

  // Adiciona BOM para Excel reconhecer UTF-8
  const BOM  = '\uFEFF';
  const blob = new Blob([BOM + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const fileName = `dashboard-fabrica_${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[T:]/g, '-')}.csv`;

  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = fileName;
  link.click();

  // Limpa o objeto URL após download
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}