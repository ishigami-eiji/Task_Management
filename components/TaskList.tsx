import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onToggleTask, onDeleteTask }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#8be9fd] mb-4 pb-2 border-b-2 border-dotted border-[#6272a4]" style={{fontFamily: "'Press Start 2P', cursive"}}>
        {title} <span className="text-[#ff79c6]">({tasks.length})</span>
      </h2>
      {tasks.length === 0 ? (
        <div className="text-center py-10 px-4 bg-[#44475a]/30 rounded-lg border-2 border-dashed border-[#6272a4]">
          <p className="text-[#bd93f9] text-2xl animate-pulse" style={{fontFamily: "'Press Start 2P', cursive"}}>タスクなし！</p>
          <p className="text-gray-400 mt-2">英雄はしばしの休息を取る...</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;