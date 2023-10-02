import {StyledSide, Overlay} from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction, resetState } from '../../context/features/auth/authSlice'

function Sidebar({setSidebar}) {
  const dispatcher = useDispatch()
  const navigate = useNavigate()
  
  const logout = async () => {
    await dispatcher(logoutAction())
    await dispatcher(resetState())
    navigate('/login')
  }
  
  return (
    <Overlay>
    <StyledSide>
      <header>
        <h1><Link to='/' onClick={() => setSidebar(false)}>JuninaSpots</Link></h1>
        <button onClick={() => setSidebar(false)}>X</button>
      </header>
      <ul>
      <button onClick={logout}>Sair</button>
      </ul>
    </StyledSide>
    </Overlay>
  )
}

export default Sidebar