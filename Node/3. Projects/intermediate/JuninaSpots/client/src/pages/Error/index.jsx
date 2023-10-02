import {Link} from 'react-router-dom'

function Error() {
  return (
    <div>
      <h1>An error ocourred</h1>
      <h2>
      <Link to='/'>
        go back
      </Link>
      </h2>
    </div>
  )
}

export default Error