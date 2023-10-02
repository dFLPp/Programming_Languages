import { StyledTrip } from './styled'
import { deleteTrip, getAllTrips } from '../../context/features/trips/tripsSlicer'
import { useDispatch } from 'react-redux'


export default function Trip({_id, title, location, createdAt}) {
    const dispatcher = useDispatch();

    const onClick = async (id) => {
      await dispatcher(deleteTrip(id))
      await dispatcher(getAllTrips());
    }

    return(<StyledTrip>
    <div>
        <h3>{title}</h3>
        <h4>{location}</h4>
        <p>Criado em: {createdAt}</p>
        <button onClick={() => onClick(_id)}>delete</button>
    </div>
  </StyledTrip>)
}
