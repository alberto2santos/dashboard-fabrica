/**
 * SensorIcons.jsx
 * Biblioteca de ícones SVG do projeto.
 * Todos baseados no padrão Feather Icons (feathericons.com).
 * Props: size (number) — tamanho em px | color (string) — cor CSS
 * @author Alberto Luiz
 */

// ── Termômetro — usado nos cards e sidebar de Temperatura ──
export function IconTemperature({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Corpo do termômetro com bulbo arredondado na base */}
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
    </svg>
  );
}

// ── Gota d'água — usado nos cards e sidebar de Umidade ─────
export function IconHumidity({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Gota formada por caminho diagonal a partir do topo */}
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  );
}

// ── Relógio / manômetro — usado nos cards e sidebar de Pressão
export function IconPressure({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Círculo externo representando o mostrador do manômetro */}
      <circle cx="12" cy="12" r="10"/>
      {/* Ponteiro do relógio — parte de cima para as 3h */}
      <path d="M12 8v4l3 3"/>
      {/* Ponto no topo — marcação 12h */}
      <path d="M12 6v.01"/>
    </svg>
  );
}

// ── Triângulo de alerta — usado na sidebar e badges de alertas
export function IconAlert({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Triângulo com borda arredondada */}
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      {/* Linha vertical do ponto de exclamação */}
      <line x1="12" y1="9" x2="12" y2="13"/>
      {/* Ponto inferior do ponto de exclamação */}
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

// ── Engrenagem — usado no botão de configurações no Header ──
export function IconSettings({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Círculo central da engrenagem */}
      <circle cx="12" cy="12" r="3"/>
      {/* Caminho externo com 8 dentes da engrenagem */}
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

// ── Seta esquerda — usado em botões de navegação/paginação ──
export function IconChevronLeft({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Ângulo apontando para a esquerda */}
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

// ── Seta direita — usado em botões de navegação/paginação ───
export function IconChevronRight({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Ângulo apontando para a direita */}
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

// ── Cruz / mais — usado em botões de adicionar zona/sensor ──
export function IconPlus({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Linha vertical */}
      <line x1="12" y1="5" x2="12" y2="19"/>
      {/* Linha horizontal */}
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
  );
}

// ── Lixeira — usado para deletar alertas e zonas ───────────
export function IconTrash({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Tampa da lixeira */}
      <polyline points="3 6 5 6 21 6"/>
      {/* Corpo da lixeira com alças laterais */}
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      {/* Linhas internas verticais da lixeira */}
      <path d="M10 11v6M14 11v6"/>
      {/* Alça superior da tampa */}
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}

// ── Lápis/editar — usado em botões de edição de zona ───────
export function IconEdit({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Quadrado externo representando o documento */}
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      {/* Lápis diagonal com ponta no canto superior direito */}
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

// ── Nuvem — usado no bloco de clima externo do Header ───────
export function IconCloud({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Contorno da nuvem com base plana */}
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
}

// ── Fábrica — usado no brand/logo do Header e sidebar ───────
export function IconFactory({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Telhado e paredes do galpão industrial */}
      <path d="M2 20h20v-8l-6-4V8l-6-4v4l-8 4v8z"/>
      {/* Portas/janelas do galpão — duas aberturas na fachada */}
      <path d="M6 20v-4h4v4M14 20v-4h4v4"/>
    </svg>
  );
}

// ── Sino — usado no botão de alertas do Header ──────────────
export function IconBell({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Corpo arqueado do sino */}
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      {/* Badalo — argola de toque na base */}
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

// ── X / fechar — usado em modais, toasts e drawers ──────────
export function IconX({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Diagonal esquerda → direita */}
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      {/* Diagonal direita → esquerda */}
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  );
}

// ── Seta circular — usado no botão de atualizar/recarregar ──
export function IconRefresh({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Ponta da seta no canto superior direito */}
      <polyline points="23 4 23 10 17 10"/>
      {/* Arco circular percorrendo ~270° no sentido anti-horário */}
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

// ── Seta para baixo com traço — usado no botão exportar CSV ─
export function IconDownload({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round">
      {/* Bandeja/base de destino do download */}
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      {/* Seta apontando para baixo */}
      <polyline points="7 10 12 15 17 10" />
      {/* Haste vertical da seta */}
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ── Pulso / ECG — usado no uptime do Header ─────────────────
export function IconActivity({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round">
      {/* Linha de pulso estilo ECG/eletrocardiograma */}
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}