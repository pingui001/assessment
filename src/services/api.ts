export const getCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) throw new Error("Error al cargar personajes");
  const data = await response.json();
  return data.results; 
};