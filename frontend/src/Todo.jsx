import React from 'react';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Todo({ todo, index, removeTodo, toggleTodo }) {
  return (
    <ListItem
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid #ddd'
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTodo(index)}
      >
        <IconButton>
          {todo.completed ? (
            <CheckCircleIcon color="success" />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>
        <Typography>{todo.text}</Typography>
      </Box>
      <IconButton color="error" onClick={() => removeTodo(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default Todo;
