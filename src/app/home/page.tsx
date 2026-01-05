"use client";

import { Card } from "@/components/Card";
import { getCharacters } from "@/services/api";
import { Character } from "@/types/character";
import { useEffect, useState } from "react";
import NavigationButton from "@/components/NavigationButton";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setError("No se pudieron cargar los personajes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Cargando personajes...
      </p>
    );
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div className="px-5 py-10 mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div>
        <NavigationButton destination="/dashboard" label="Ir al Dashboard" />
      </div>
      {characters.map((character) => (
        <div key={character.id}>
          <Card
            title={character.name}
            description={`${character.species} • ${character.status} • ${character.gender}`}
            imageUrl={character.image}
            onClick={() => {
              alert(`¡Has clickeado en ${character.name}!`);
              console.log("Personaje seleccionado:", character);
            }}
          />
        </div>
      ))}
    </div>
  );
}
