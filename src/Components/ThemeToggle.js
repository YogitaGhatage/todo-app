import React from 'react';
import { Form } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'react-bootstrap-icons';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label={isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        checked={isDarkMode}
        onChange={toggleTheme}
      />
    </Form>
  );
};

export default ThemeToggle;