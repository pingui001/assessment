// src/hooks/useCharactersDashboard.ts

import { useEffect, useState, useMemo } from 'react';
import { Character } from '@/types/character';
import { getCharacters } from '@/services/api';

export const useCharactersDashboard = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    alive: 0,
    dead: 0,
    unknown: 0,
  });

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: Character[] = await getCharacters();

        setCharacters(data);
        setFilteredCharacters(data);

        const alive = data.filter(c => c.status === 'Alive').length;
        const dead = data.filter(c => c.status === 'Dead').length;
        const unknown = data.filter(c => c.status === 'unknown').length;

        setStats({
          total: data.length,
          alive,
          dead,
          unknown,
        });
      } catch (err: any) {
        setError(err.message || 'Error al cargar los personajes');
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  useEffect(() => {
    let temp = [...characters];

    if (search) {
      temp = temp.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      temp = temp.filter(c => c.status === statusFilter);
    }

    setFilteredCharacters(temp);
  }, [search, statusFilter, characters]);

  const totalVisible = useMemo(() => filteredCharacters.length, [filteredCharacters]);

  return {
    filteredCharacters,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    stats,
    totalVisible,
  };
};