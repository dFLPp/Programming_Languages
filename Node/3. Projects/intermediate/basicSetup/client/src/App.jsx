import { useState } from 'react'
import axios from 'axios'

const apiURL = '/api/v1';

function App() {
  const [msg, setMsg] = useState('');

  const getData = async () => {
    const resp = await axios.get(apiURL);
    setMsg(resp.data.msg);
  }

  return (<>
  <h1>Data: {msg}</h1>
  <button onClick={getData}>proxy data</button>
  </>)
}

export default App
