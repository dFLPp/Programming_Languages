import React from 'react'
import GlobalStyle from './global.styled'
import {Outlet} from 'react-router-dom'
import {ProtectionLayer} from '../index'
import {Navbar,  Sidebar} from '../index'


function SharedLayout(){
  const [sidebar, setSidebar] = React.useState(false);

  return (<>
    <GlobalStyle/>
    <ProtectionLayer>
      <Navbar setSidebar={setSidebar}/>
      {sidebar ? <Sidebar setSidebar={setSidebar}/> : ''}
      <Outlet/>
    </ProtectionLayer>
  </>)
}

export default SharedLayout