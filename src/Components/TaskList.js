import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { ListGroup } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);

  return (
    <ListGroup>
      <TransitionGroup>
        {tasks.map(task => (
          <CSSTransition
            key={task.id}
            timeout={300}
            classNames="task"
          >
            <TaskItem task={task} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListGroup>
  );
};

export default TaskList;