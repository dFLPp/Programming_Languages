import { useState, useEffect } from 'react'
import { LoginStyled, AuthStyle} from './styled'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {registerAction , resetState} from '../../context/features/auth/authSlice'

function Register() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const {name, email, password, confirmPassword} = formData;
  
  const [alert, setAlert] = useState({
    state: false,
    msg: ''
  });

  const { user, token, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) setAlert({state:true, msg:message})
    if (user && token) navigate('/')
    dispatcher(resetState())
  }, [user, isError, token, message, navigate, dispatcher])

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
    if(password !== confirmPassword){
      setAlert({state:true, msg:'as senhas precisam ser iguais'})
      return
    }
    else{
      const userData = {
        name,
        email,
        password
      }
      dispatcher(registerAction(userData))
    }
  }


  return (<>
    <AuthStyle/>
    <LoginStyled showAlert={alert.state}>
      <header><h1>Se registre aqui</h1></header>
        <article>
          <form onSubmit={onSubmit}>
            <label htmlFor='name'>seu nome</label><br/>
            <input type="text" name='name' required placeholder='nome' value={name} onChange={onChange} minLength='3' maxLength='50'/><br/>
            
            <label htmlFor='email'>seu email</label><br/>
            <input type="email" name='email' required placeholder='email' value={email} onChange={onChange}/><br/>
            
            <label htmlFor='password'>sua senha</label><br/>
            <input type="password" name='password' required placeholder='senha' value={password} onChange={onChange} minLength='6'/><br/>
            
            <label htmlFor='confirmPassword'>sua senha</label><br/>
            <input type="password" name='confirmPassword' required placeholder='repita a senha' value={confirmPassword} onChange={onChange} minLength='6'/><br/>
  
            <button type='submit'>registrar</button>
          </form>
        </article>
      <footer>
        <p>já tem conta? Entre <Link to='/login'>agora</Link></p>
        <br/>
        <br/>
        <p className='alert'>{alert.msg}</p>
      </footer>
    </LoginStyled>
  </>)
}

export default Register