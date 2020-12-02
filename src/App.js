import styled from 'styled-components'
import MaiForm from "./components/MainForm";
import Ghost from './components/Ghost'

function App() {
  
  return (
    <ParentComponent className="App">
      <Ghost/>
      <MaiForm />
    </ParentComponent>
  );
}

export default App;

const ParentComponent = styled.div`
    background-color:#dadce0;
`