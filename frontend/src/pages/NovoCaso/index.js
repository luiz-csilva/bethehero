import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css'

import api from '../../services/api'

function NovoCaso () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  const ongId = localStorage.getItem('ongId')
  

  async function handleNovoCaso (event){
    event.preventDefault()

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('/casos', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch (error) {
      alert ('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return(
    <div className="novo-caso-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNovoCaso}>
          <input placeholder="Título do caso" value={title} onChange={event => setTitle (event.target.value)} />
          <textarea placeholder="Descrição" value={description} onChange={event => setDescription (event.target.value)} />
          <input placeholder="Valor em reais" value={value} onChange={event => setValue (event.target.value)} />
        
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default NovoCaso