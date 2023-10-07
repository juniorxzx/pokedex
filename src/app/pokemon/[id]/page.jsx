'use client'
import Image from 'next/image'
import styles from './pokemon.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// Usando a rota dinamica do Next pude recuperar o ID pelo Params e então ocnseguir resgatar o que seria exibido
// como, os dados do pokemon selecionado.
export default function Pokemon({ params }) {
    const [pokemon, setPokemon] = useState(null)

    // Uma pequena verificação se o ID existe 
    useEffect(() => {
        if (params.id) {
            getPokemon(params.id)
        }
    }, [params.id])

    // Função que pesquisa pelo id recuperado o pokemon
    const getPokemon = async (id) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            console.log(response.data)
            setPokemon(response.data)
        } catch (error) {
            console.log("Erro ao buscar dados do Pokémon", error)
        }
    }

    // Fiz como funções botões de voltar e proximo, para navegar entre os 
    // pokemons sem a necessidade de voltar a tela inicial
    const back = () => {
        const id = params.id - 1;
        return id >= 1 ? id : 1;
    }

    const next = () => {
        const id = parseInt(params.id) + 1;
        return id;
    }

    // Aqui é um calculo de porcentagem de acordo com o stats do pokemon
    const calculatePercentage = (value, maxValue) => {
        return (value / maxValue) * 100;
    };
    return (
        <main className={styles.main}>

            <div className={styles.menu}>
                <Link href={`/pokemon/${back()}`} className={styles.linkBack}>Voltar</Link>
                <Link href={'/'}>Home</Link>
                <Link href={`/pokemon/${next()}`} className={styles.linkNext}>Próximo</Link>
            </div>
            {pokemon ? (

                <div className={styles.card}>
                    <h1>{pokemon.name}</h1>
                    <span className={styles.number}>n° {pokemon.id}</span>
                    <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={200} height={200} />

                    <div className={styles.content}>
                        <div className={styles.div}>
                            <li className={styles.item}>
                                <span className={styles.span}>  Altura: </span>
                                <p>{pokemon.height}</p>
                            </li>
                            <li className={styles.item}>
                                <span className={styles.span}>Peso:</span>
                                <p>{pokemon.weight}</p>
                            </li>
                            <li className={styles.item}>
                                <span className={styles.span}>Tipo(s):</span>
                                <p>{pokemon.types.map(type => type.type.name).join(', ')}</p>
                            </li>
                            <li className={`${styles.item} ${styles.itemFlex}`}>
                                <span className={styles.span}   >Habilidade(s):</span>
                                <p>{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                            </li>
                        </div>
                        <div className={styles.contentStats}>
                            <h1 >Estatísticas base </h1>
                            {pokemon.stats.map((stat, key) => (
                                <li className={styles.item} key={key}>
                                    <span className={styles.span}>{stat.stat.name}:</span>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progress}
                                            style={{ width: `${calculatePercentage(stat.base_stat, 200)}%` }}
                                        ></div>
                                        <span className={styles.baseStat}>{stat.base_stat}</span>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            )
                :
                // Caso não ache nenhum pokemon pelo id ele fica nisso, ainda vai ser exibido o menu para o 
                // usuario voltar para o inicio, também antes de carregar os dados da API ele aparece "carregando"
                <div>
                    Carregando...
                </div>
            }


        </main >

    )
}
