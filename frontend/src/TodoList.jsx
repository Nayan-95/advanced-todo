import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

function TodoList({ todos, updateTodoStatus, removeTodo, status }) {
  return (
    <Box>
      {todos.map((todo, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: '1rem',
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            background: '#fff',
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
              {todo.text}
            </Typography>
            <Box mt={2} display="flex" justifyContent="space-between">
              {status && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => updateTodoStatus(index)}
                  sx={{ background: '#007bff', '&:hover': { background: '#0056b3' } }}
                >
                  Move to {status}
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => removeTodo(index)}
                sx={{ background: '#dc3545', '&:hover': { background: '#a71d2a' } }}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default TodoList;
