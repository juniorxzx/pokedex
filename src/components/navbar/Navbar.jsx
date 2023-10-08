'use client'
import Image from 'next/image'
import React, { useState } from 'react'

import styles from './Navbar.module.css'

const Navbar = ({ onClick, search }) => {
    const [open, setOpen] = useState(true)

    // Uma navbar para poder fazer as pesquisas dos pokemons... 
    // Pensei em colocar algum nome na navbar, mas achei que só um icone de um pokebola ficaria legal e
    // Deixei como titulo da pagina inicial o nome do projeto.
    return (
        <nav className={styles.navbar}>
            <button onClick={onClick} className={styles.button}>
                Carregar mais
            </button>
            <Image onClick={() => setOpen(!open)} src={`/${open ? 'pokeball2' : 'open-pokeball'}.png`} alt='Menu' width={70} height={70} className={styles.icon} />

            <div className={styles.input}>
                <input type='search' onChange={(e) => search(e.target.value)}
                    placeholder='Pesquisar' />
            </div>
        </nav>
    )
}

export default Navbar