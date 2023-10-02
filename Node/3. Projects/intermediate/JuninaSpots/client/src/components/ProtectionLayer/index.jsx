import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function ProtectionLayer({children}) {
  const { token, user } = useSelector((state) => state.auth)
  if(!token || !user) return <Navigate to='/login'/>
  else return children
}

export default ProtectionLayer