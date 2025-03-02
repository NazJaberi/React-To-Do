import './App.css';
import Header from './Components/Header'
import Main from './Components/Main'
import AddNewTodo from './Components/AddNewTodo'
import Calandar from './Components/Calandar'
import EditTodo from './Components/EditTodo'
import Projects from './Components/Projects'
import Todos from './Components/Todos'
import User from './Components/User'


function App() {
  return (
    <div className="App">
      <Header>
        <User />
        <AddNewTodo />
        <Calandar />
        <Projects />
      </Header>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
