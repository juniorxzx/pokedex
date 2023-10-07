import Image from 'next/image'
import React from 'react'

import styles from './Navbar.module.css'
const Navbar = ({ search }) => {
    // Uma navbar para poder fazer as pesquisas dos pokemons... 
    // Pensei em colocar algum nome na navbar, mas achei que só um icone de um pokebola ficaria legal e
    // Deixei como titulo da pagina inicial o nome do projeto.
    return (
        <nav className={styles.navbar}>
            <div>
                <Image src={'/pokeball.png'} width={48} height={48} alt='logo' />
            
            </div>
            <div className={styles.input}>
                <input type='search' onChange={(e) => search(e.target.value)}
                    placeholder='Pesquisar' />
            </div>

        </nav>
    )
}

export default Navbar