import React from 'react';
import { Task } from '../types';
import { CheckIcon, UndoIcon, TrashIcon, ClockIcon } from './icons';
import { PixelButton } from './PixelButton';

interface TaskCardProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleTask, onDeleteTask }) => {
  const dueDate = new Date(task.dueDate);
  const isOverdue = !task.isComplete && new Date() > dueDate;

  // 日時をフォーマットする関数
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('ja-JP', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };
  
  // カードのスタイルを動的に決定
  const cardBgClass = task.isComplete ? 'bg-[#44475a]/30 opacity-60' : 'bg-[#44475a]';
  const overdueGlow = isOverdue ? 'shadow-[0_0_15px_rgba(255,85,85,0.7)] border-[#ff5555]' : 'border-[#6272a4]';

  return (
    <li className={`${cardBgClass} p-3 rounded-lg border-2 ${overdueGlow} transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <div className="flex-grow mr-2">
          <p className={`font-bold text-base text-[#f8f8f2] break-all ${task.isComplete ? 'line-through text-gray-500' : ''}`}>
            {task.content}
          </p>
          <div className={`flex items-center mt-2 text-xs ${isOverdue ? 'text-[#ff5555] font-bold animate-pulse' : 'text-[#6272a4]'}`}>
            <ClockIcon className="w-4 h-4 mr-1"/>
            <span>{formatDateTime(dueDate)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
          {/* 完了/戻すボタン */}
          <PixelButton
            onClick={() => onToggleTask(task.id)}
            color={task.isComplete ? 'yellow' : 'green'}
            className="!p-2 w-10 h-10 flex items-center justify-center"
            title={task.isComplete ? 'タスクに戻す' : 'タスク達成！'}
          >
            {task.isComplete ? <UndoIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
          </PixelButton>
          {/* 削除ボタン */}
          <PixelButton
            onClick={() => onDeleteTask(task.id)}
            color="red"
            className="!p-2 w-10 h-10 flex items-center justify-center"
            title="タスク削除"
          >
            <TrashIcon className="w-5 h-5" />
          </PixelButton>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;