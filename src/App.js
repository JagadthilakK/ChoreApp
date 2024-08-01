import React, { useState ,useEffect} from 'react';
import './App.css';

function App() {
  const [chore, setChore] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const SubmitBtn = (e) => {
    e.preventDefault(); // stops from reloading the page from form submission
    if(!(chore)) alert("ENTER A CHORE");
    else if(!(description)) alert("ENTER THE DESCRIPTION");
    if (chore && description) {
      const newTodo = { chore, description };
      setTodos([...todos, newTodo]);
      setChore('');
      setDescription('');
    }
  };

  const choreDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index); // The underscoreis used as a placeholder for the current item
    setTodos(newTodos);
  };

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Failed to parse todos from local storage', error);
      }
    }
  }, []);

  // Save todos to local storage whenever todos array changes
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to local storage', error);
    }
  }, [todos]);

  return (
    <div className="App">
      <div className='body'>
        <div className="toDoHeading">
          <div>To-Do</div>
        </div>
        <div className="todoForm">
          <label htmlFor='chore'>Enter Chore</label>
          <input
            id='chore'
            type="text"
            value={chore}
            onChange={(e) => setChore(e.target.value)}
          />
          <label htmlFor='description'>Enter Description</label>
          <textarea
            id='description'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={SubmitBtn}>Add</button>
        </div>
      </div>
      <div className="todoList">
        {todos.map((todo, index) => (
          <div key={index} className="todoItem">
            <h2>{todo.chore}</h2>
            <p>{todo.description}</p>
            <button onClick={() => choreDelete(index)}>Completed!</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
