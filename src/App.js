import styled from 'styled-components'
import MaiForm from "./components/MainForm";


function App() {
  
  return (
    <ParentComponent className="App">
        <MaiForm />
    </ParentComponent>
  );
}

export default App;

const ParentComponent = styled.div`
    background-color:#dadce0;
`