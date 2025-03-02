import './App.css';
import Sidebar from './Components/Sidebar'
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
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calandar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
