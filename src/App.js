import React from 'react';
import { Container, Row, Col, Card, ToastContainer } from 'react-bootstrap';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import ThemeToggle from './Components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{minHeight: '100vh'}}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className={`shadow-lg ${isDarkMode ? 'bg-secondary text-light' : 'bg-white'}`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="display-4 mb-0">To-Do List</h1>
                  <ThemeToggle />
                </div>
                <TaskInput />
                <TaskList />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-end" className="p-3" />
    </div>
  );
}

export default App;
