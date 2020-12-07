import React, {useEffect, useState,useContext} from 'react'
import styled from 'styled-components'
import Menu from './containers/menu';
import UserContext from "./context/UserContext";



function App() {

  const ctxUser = useContext(UserContext);

  

  useEffect(() => {
      const savedToken = sessionStorage.getItem("edp_loggedUser", []);
      const userId = sessionStorage.getItem("userId", []);
      if (userId) {
        ctxUser.loginUserSuccess(userId,savedToken,null);
      }

      // setUserProfile(parsedCount);
      // console.log(parsedCount , "this get token ee");
    }, []);
  
  return (
    
    <ParentComponent className="App">


      
      <Menu/>
    </ParentComponent>
    
  );
}

export default App;

const ParentComponent = styled.div`
    background-color:#dadce0;
`