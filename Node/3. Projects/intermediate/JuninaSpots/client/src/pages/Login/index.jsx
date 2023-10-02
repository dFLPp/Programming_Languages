import { useState, useEffect } from 'react'
import { LoginStyled, AuthStyle } from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {loginAction , resetState} from '../../context/features/auth/authSlice'

function Login() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const {email, password} = formData;
  
  const [alert, setAlert] = useState({
    state: false,
    msg: ''
  });

  const { user, token, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) setAlert({state:true, msg:message})
    if (user && token) navigate('/')
    dispatcher(resetState())
  }, [user, isError, message, navigate, dispatcher])

  useEffect(() => {
    const removal = setTimeout(() => setAlert({state:false, msg:''}), 3000)
    return () => {
      clearTimeout(removal);
    }
  }, [alert])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatcher(loginAction(userData))
  }


  return (<>
    <AuthStyle/>
    <LoginStyled showAlert={alert.state}>
      <header><h1>Faça login aqui</h1></header>
        <article>
          <form onSubmit={onSubmit}>
            <label htmlFor='email'>seu email</label><br/>
            <input type="email" name='email' required placeholder='email' value={email} onChange={onChange}/><br/>
            <label htmlFor='email'>sua senha</label><br/>
            <input type="password" name='password' required placeholder='password' value={password} onChange={onChange} minLength='6'/><br/>
            <button type='submit'>entrar</button>
          </form>
        </article>
      <footer>
        <p>não tem conta? registre-se <Link to='/register'>aqui</Link></p>
        <br/>
        <br/>
        <p className='alert'>{alert.msg}</p>
        </footer>
    </LoginStyled>
  </>)
}

export default Login