import { useState, useEffect, useRef } from 'react';
import { searchCities }                from '../../services/weatherService';
import { IconRefresh }                 from './icons/SensorIcons';

export function CitySearch({ value, onSelect }) {
  const [query,       setQuery]       = useState(value ?? '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [open,        setOpen]        = useState(false);
  const debounceRef  = useRef(null);
  const containerRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce na busca — espera 400ms após parar de digitar
  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (val.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        setLoading(true);
        const results = await searchCities(val);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }

  function handleSelect(city) {
    setQuery(city.label);
    setSuggestions([]);
    setOpen(false);
    onSelect(city); // envia para o store
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <span className="text-xs text-surface-500">Cidade</span>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Digite o nome da cidade..."
          className="bg-surface-700 border border-surface-600 rounded-lg
                     px-3 py-1.5 text-sm text-surface-100 w-full
                     focus:outline-none focus:border-brand-500
                     pr-8"
        />

        {/* Spinner de loading */}
        {loading && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2
                           text-surface-500 animate-spin">
            <IconRefresh size={14} />
          </span>
        )}
      </div>

      {/* Dropdown de sugestões */}
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50
                       bg-surface-800 border border-surface-700
                       rounded-lg shadow-xl overflow-hidden">
          {suggestions.map((city, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(city)}
                className="w-full text-left px-3 py-2.5
                           hover:bg-surface-700 transition-colors
                           flex flex-col gap-0.5"
              >
                <span className="text-sm text-surface-100 font-medium">
                  {city.name}
                </span>
                <span className="text-xs text-surface-500">
                  {[city.state, city.country].filter(Boolean).join(', ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Sem resultados */}
      {open && !loading && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50
                        bg-surface-800 border border-surface-700
                        rounded-lg shadow-xl px-3 py-3">
          <p className="text-xs text-surface-500 text-center">
            Nenhuma cidade encontrada.
          </p>
        </div>
      )}
    </div>
  );
}