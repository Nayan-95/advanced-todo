import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Box } from '@mui/material';
import TodoList from './TodoList';

const Todos = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]); // For Undo functionality

  const addTodo = () => {
    if (text) {
      setTodos([...todos, { text: text, status: 'pending' }]); // Default status: 'pending'
      setText('');
    }
  };

  const updateTodoStatus = (index, newStatus) => {
    const newTodos = [...todos];
    newTodos[index].status = newStatus; // Update status
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const removedTodo = todos[index];
    setHistory([...history, removedTodo]); // Add to history for undo
    setTodos(todos.filter((_, i) => i !== index)); // Remove from todos
  };

  const undoLastTask = () => {
    if (history.length > 0) {
      const lastTask = history[history.length - 1];
      setTodos([...todos, lastTask]); // Add back to todos
      setHistory(history.slice(0, -1)); // Remove from history
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem', background: '#f0f4f8', borderRadius: '10px', padding: '2rem' }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom style={{ color: '#004d99', fontWeight: 'bold' }}>
          Task Management Premium App
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          fullWidth
          label="Enter a task"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            background: '#ffffff',
            borderRadius: '5px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          sx={{
            marginLeft: '1rem',
            background: '#0066cc',
            '&:hover': { background: '#004d99' },
          }}
        >
          Add
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={undoLastTask}
        disabled={history.length === 0} // Disable if no history
        sx={{
          marginBottom: '1rem',
          background: history.length > 0 ? '#f50057' : '#cccccc',
          '&:hover': { background: history.length > 0 ? '#c51162' : '#cccccc' },
        }}
      >
        Undo Last Task
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: '#ffecb3',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '#ff9800', fontWeight: 'bold' }}>
              Pending
            </Typography>
            <TodoList
              todos={todos.filter((todo) => todo.status === 'pending')}
              updateTodoStatus={(index) => {
                const pendingTodos = todos.filter((todo) => todo.status === 'pending');
                updateTodoStatus(todos.indexOf(pendingTodos[index]), 'inProgress');
              }}
              removeTodo={(index) => {
                const pendingTodos = todos.filter((todo) => todo.status === 'pending');
                removeTodo(todos.indexOf(pendingTodos[index]));
              }}
              status="inProgress"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: '#cce5ff',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '#007bff', fontWeight: 'bold' }}>
              In Progress
            </Typography>
            <TodoList
              todos={todos.filter((todo) => todo.status === 'inProgress')}
              updateTodoStatus={(index) => {
                const inProgressTodos = todos.filter((todo) => todo.status === 'inProgress');
                updateTodoStatus(todos.indexOf(inProgressTodos[index]), 'done');
              }}
              removeTodo={(index) => {
                const inProgressTodos = todos.filter((todo) => todo.status === 'inProgress');
                removeTodo(todos.indexOf(inProgressTodos[index]));
              }}
              status="done"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              background: '#d4edda',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ color: '#28a745', fontWeight: 'bold' }}>
              Done
            </Typography>
            <TodoList
              todos={todos.filter((todo) => todo.status === 'done')}
              removeTodo={(index) => {
                const doneTodos = todos.filter((todo) => todo.status === 'done');
                removeTodo(todos.indexOf(doneTodos[index]));
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Todos;
