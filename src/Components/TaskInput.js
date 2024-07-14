import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { Button, Form, InputGroup, Toast } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { PlusCircle } from 'react-bootstrap-icons';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    } else {
      setShowToast(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} border-right-0`}
          />
          <Button variant={isDarkMode ? "outline-light" : "outline-primary"} type="submit">
            <PlusCircle size={20} /> Add Task
          </Button>
        </InputGroup>
      </Form>
      <Toast 
  onClose={() => setShowToast(false)} 
  show={showToast} 
  delay={3000} 
  autohide
  animation={true}
  className={`position-fixed bottom-0 end-0 m-3 ${isDarkMode ? 'dark-mode-toast' : ''} warning-toast`}
>
  <Toast.Header>
    <strong className="me-auto">Warning</strong>
  </Toast.Header>
  <Toast.Body>Please enter a task before adding.</Toast.Body>
</Toast>
    </>
  );
};

export default TaskInput;