import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../redux/actions';
import { ListGroup, Button, Modal, Form, Toast } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { Pencil, Trash, CheckCircle, Circle } from 'react-bootstrap-icons';

const TaskItem = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const handleDelete = () => dispatch(deleteTask(task.id));
  const handleToggle = () => {
    dispatch(toggleTask(task.id));
    setShowToast(true);
  };
  
  const handleEdit = () => {
    if (editedTask.trim()) {
      dispatch(editTask(task.id, editedTask));
      setShowModal(false);
    }
  };

  return (
    <>
      <ListGroup.Item 
        className="d-flex justify-content-between align-items-center mb-2 rounded task-item-animate"
        variant={task.completed ? "success" : (isDarkMode ? "dark" : "light")}
      >
        <div className="d-flex align-items-center">
          <Button variant="link" onClick={handleToggle} className="p-0 me-3">
            {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
          </Button>
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            fontSize: '1.1rem'
          }}>
            {task.text}
          </span>
        </div>
        <div>
          <Button variant={isDarkMode ? "outline-light" : "outline-primary"} size="sm" onClick={() => setShowModal(true)} className="me-2 btn-animate">
            <Pencil />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete} className="btn-animate">
            <Trash />
          </Button>
        </div>
      </ListGroup.Item>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
          <Form.Control
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
          />
        </Modal.Body>
        <Modal.Footer className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
          <Button variant={isDarkMode ? "outline-light" : "secondary"} onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant={isDarkMode ? "light" : "primary"} onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide
        animation={true}
        className={`position-fixed bottom-0 end-0 m-3 ${isDarkMode ? 'dark-mode-toast' : ''} ${task.completed ? 'success-toast' : 'danger-toast'}`}
      >
        <Toast.Header>
          <strong className="me-auto">{task.completed ? 'Task Completed' : 'Task Incomplete'}</strong>
        </Toast.Header>
        <Toast.Body>
          Task "{task.text}" marked as {task.completed ? 'completed' : 'incomplete'}.
        </Toast.Body>
      </Toast>
    </>
  );
};

export default TaskItem;