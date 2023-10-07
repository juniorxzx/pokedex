import React from 'react'
import styles from './CardPokemon.module.css'
import Image from 'next/image'
import Link from 'next/link'
const CardPokemon = ({ image, name, number, types, param }) => {

    // Aqui foram feitas as definições das cores/estilos e os tipos de acordo com cada pokemon
    const typesPokemon = () => {
        if (types[1]) {
            return (
                <div className={styles.types}>
                    <span className={`${styles.type} ${styles[types[0].type.name] || ''}`}>
                        {types[0].type.name}
                    </span>
                    <span className={`${styles.type} ${styles[types[1].type.name] || ''}`}>
                        {types[1].type.name}
                    </span>
                </div>
            )
        }
        return (
            <span className={`${styles.type} ${styles[types[0].type.name] || ''}`}>
                {types[0].type.name}
            </span>
        )
    }

    return (
        // Criação do card, onde recebe os parametros
        <Link href={`/pokemon/${param}`}>
            <div className={styles.card}>
                <span className={styles.number}>{number}</span>

                <div className={styles.image}>
                    <Image src={image} alt='' height={100} width={100} />
                </div>
                <div className={styles.infos}>
                    <span>{name}</span>
                    <div className={styles.types}>
                        {typesPokemon()}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardPokemon