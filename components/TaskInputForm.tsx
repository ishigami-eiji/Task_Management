import React, { useState } from 'react';
import { PixelButton } from './PixelButton';

interface TaskInputFormProps {
  onAddTask: (content: string, dueDate: string) => void;
}

const TaskInputForm: React.FC<TaskInputFormProps> = ({ onAddTask }) => {
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !dueDate) {
      alert("タスクの内容と期限の両方を入力してください。");
      return;
    }
    onAddTask(content, dueDate);
    // 入力フォームをリセット
    setContent('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-[#44475a]/50 rounded-lg border-2 border-[#6272a4]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        {/* タスク内容入力 */}
        <div className="w-full">
          <label htmlFor="task-content" className="block text-sm font-bold text-[#8be9fd] mb-1">
            新規タスク
          </label>
          <input
            id="task-content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="新しいタスクの内容を入力..."
            className="w-full px-4 py-2 bg-[#282a36] border-2 border-[#6272a4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff79c6] focus:border-[#ff79c6] transition"
            required
          />
        </div>
        {/* 期限入力 */}
        <div className="w-full">
          <label htmlFor="task-duedate" className="block text-sm font-bold text-[#8be9fd] mb-1">
            達成期限
          </label>
          <input
            id="task-duedate"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 bg-[#282a36] border-2 border-[#6272a4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff79c6] focus:border-[#ff79c6] transition"
            required
          />
        </div>
      </div>
      {/* 追加ボタン */}
      <PixelButton
        type="submit"
        color="pink"
        className="w-full mt-4"
      >
        タスク追加
      </PixelButton>
    </form>
  );
};

export default TaskInputForm;