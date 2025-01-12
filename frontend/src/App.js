import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Todos from './Todos';

function App() {
  const [showTodos, setShowTodos] = useState(false);

  const navigateToTodos = () => {
    setShowTodos(true);
  };

  return <>{showTodos ? <Todos /> : <LandingPage navigateToTodos={navigateToTodos} />}</>;
}

export default App;
