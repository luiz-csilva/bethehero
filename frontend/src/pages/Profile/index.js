import React, { useState, useEffect } from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

function Profile () {
  const history = useHistory()

  const [casos, setCasos] = useState([])

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('/perfil', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCasos(response.data)
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try{
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })

      setCasos(casos.filter(casos => casos.id !== id))
    } catch (error) {
      alert ('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
        <button type="button">
          <FiPower onClick={handleLogout} size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        
        {casos.map(casos => (
          <li key={casos.id}>
          <strong>CASO:</strong>
          <p>{casos.title}</p>

          <strong>DESCRIÇÃO</strong>
          <p>{casos.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(casos.value)}</p>

          <button onClick={() => handleDeleteIncident(casos.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}

      </ul>
    </div>
  )
}

export default Profile