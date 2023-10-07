'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardPokemon from '@/components/card/CardPokemon'
import Navbar from '@/components/navbar/Navbar'
import Link from 'next/link'

export default function Home() {

  // criação dos states
  const [pokemons, setPokemons] = useState([])
  const [results, setResults] = useState([]);

  useEffect(() => {
    listPokemons()
  }, [])


  // Aqui uma função assincrona que carrega os dados dos pokemons
  const listPokemons = async () => {
    const endpoints = []
    for (var i = 1; i <= 150; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }

    try {
      const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      const pokemonData = responses.map((res) => res.data)
      setPokemons(pokemonData)
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon", error)
    }
  }

  // Função para fazer busca de pokemons, onde quando for inserido o nome de letra minuscula ou maiusla vai
  // ignorado e seguir com a busca sem fazer diferença entre.
  const searchPokemon = (name) => {
    if (name === "") {
      setResults([]);
      return;
    }
    const search = pokemons.filter((pokemon) =>
      pokemon.name.includes(name.toLowerCase())
    );

    setResults(search);
  };

  return (
    <main className={styles.main}>
      <Navbar search={searchPokemon} />

      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.cards}>
        {/* um map da pesquisa e de todos os pokemons sem ter que ser recarregado tudo novamente. */}
        {(results.length > 0 ? results : pokemons).map((pokemon, key) => (
          <div key={key}>
            <CardPokemon
              number={pokemon.id}
              name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              image={pokemon.sprites.front_default}
              types={pokemon.types}
              param={pokemon.id}
            />
          </div>
        ))}
      </div>

    </main>
  )
}
