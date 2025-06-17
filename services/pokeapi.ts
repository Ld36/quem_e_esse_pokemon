export async function getPokemon(nameOrId: string | number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error('Pokémon não encontrado');
  return response.json();
}
