import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTrip, getAllTrips, resetState } from '../../context/features/trips/tripsSlicer'
import { StyledDashboard } from './styled'
import { Trip } from '../../components'

function Dashboard(){
  const dispatcher = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { userTrips, isError, message } = useSelector(state => state.trips);
  const [alert, setAlert] = React.useState({
    state: false,
    msg: ''
  });

  React.useEffect(() => {
    if (isError){
      setAlert({state:true, msg:message})
      console.log('error ocurred in the Dashboard')
    }
    return () => {
      dispatcher(resetState());
    }
  }, [user, isError, message, dispatcher])

  React.useEffect(() => {
    dispatcher(getAllTrips());
  }, [])

  React.useEffect(() => {
    const removal = setTimeout(() => setAlert({state:false, msg:''}), 3000)
    return () => {
      clearTimeout(removal);
    }
  }, [alert])

  const [formData, setFormData] = React.useState({
    title:'',
    location:''
  })

  const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const {title, location} = formData;
    const requestData = {
      title,
      location
    }

    dispatcher(createTrip(requestData))
    dispatcher(getAllTrips());
    setFormData({title: '', location:''})
  }

  return (<>
  <StyledDashboard showAlert={alert.state}>
    <header>
      <h1 style={{color: 'black', margin: '.2em'}}>Seu painel ({user.name})</h1>
    </header>
    <main>
    <article>
      <h1>Crie suas postagens aqui...</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>title</label><br/>
        <input type="text" name="title" minLength='3' maxLength='25' required value={formData.title} onChange={onChange}/><br/>
        <label htmlFor='title'>location</label><br/>
        <input type="text" name="location" minLength='3' maxLength='15' required value={formData.location} onChange={onChange}/><br/>
        <button type='submit'>criar</button>
      </form>
    </article>
    <aside>
      <h1>Your trips stay here</h1>
      <div className='tripsContainer'>
        {userTrips.length < 1 ? 
        ''
        :
        userTrips.map((trip) => {
          return <Trip key={trip._id} {...trip}/>
        })
        }
      </div>
    </aside>
    </main>
    <footer>
      <p className='alert'>{alert.msg}</p>
    </footer>
  </StyledDashboard>
  </>)
}

export default Dashboard