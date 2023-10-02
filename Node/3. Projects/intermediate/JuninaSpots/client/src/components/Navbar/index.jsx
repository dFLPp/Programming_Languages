import { StyledNav } from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction, resetState } from '../../context/features/auth/authSlice'

function Navbar({setSidebar}) {
  const dispatcher = useDispatch()
  const navigate = useNavigate()
  const logout = async () => {
    await dispatcher(logoutAction())
    await dispatcher(resetState())
    navigate('/login')
  }
  return (
    <StyledNav>
      <div>
        <h1><Link to='/'>JuninaSpots</Link></h1>
        <ul>
        <button onClick={logout}>Sair</button>
        </ul>
        <svg 
        onClick={() => setSidebar(true)}
        viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </div>
    </StyledNav>
  )
}

export default Navbar