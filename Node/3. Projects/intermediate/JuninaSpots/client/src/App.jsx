import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Dashboard, Login, Register, Error} from './pages'
import {SharedLayout} from './components'

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<Error/>}/>
      <Route path='/' element={<SharedLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='*' element={<Error/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  </BrowserRouter>
  </>)
}

export default App
