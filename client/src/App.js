import React, { Fragment } from 'react';
import './App.css';
import InputToDo from './Components/InputToDo';
import ListToDo from './Components/ListToDo';

function App() {
  return (
<Fragment>
  <InputToDo/>
  <ListToDo/>
</Fragment>
  );
}

export default App;
