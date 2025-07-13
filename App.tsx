import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import { useTaskManager } from './hooks/useTaskManager';
import TaskInputForm from './components/TaskInputForm';
import TaskList from './components/TaskList';
import ShareControls from './components/ShareControls';
import { Character } from './components/Character';
import { Toaster, toast } from 'react-hot-toast';

type CharacterStatus = 'idle' | 'success' | 'warning' | 'info';

const App: React.FC = () => {
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>('idle');
  const [characterMessage, setCharacterMessage] = useState('ようこそ冒険者よ！今日のタスクはなんだい？');

  const showSuccessMessage = (message: string) => {
    setCharacterStatus('success');
    setCharacterMessage(message);
  };
  
  // useTaskManagerフックからタスク管理ロジックを取得
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    importTasks: originalImportTasks,
  } = useTaskManager({ 
      onTaskAddSuccess: () => showSuccessMessage('新しいタスクを追加したぞ！'), 
      onTaskToggleSuccess: () => showSuccessMessage('ステータス更新！でかしたぞ！'), 
      onTaskDeleteSuccess: () => showSuccessMessage('タスクを削除した。賢明な判断だ。') 
  });

  // 未完了と完了済みのタスクをフィルタリング
  const incompleteTasks = tasks.filter(task => !task.isComplete);
  const completedTasks = tasks.filter(task => task.isComplete);

  // キャラクターの状態をタスクリストに応じて更新
  useEffect(() => {
    // 成功メッセージは短時間でリセット
    if (characterStatus === 'success') {
      const timer = setTimeout(() => {
        setCharacterStatus('info');
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    const hasOverdue = incompleteTasks.some(task => new Date(task.dueDate) < new Date());

    if (hasOverdue) {
      setCharacterStatus('warning');
      setCharacterMessage('大変だ！期限切れのタスクがあるぞ！急げ！');
    } else if (tasks.length === 0) {
      setCharacterStatus('idle');
      setCharacterMessage('進行中のタスクはないようだ。一休みするかい？');
    } else if (incompleteTasks.length === 0) {
      setCharacterStatus('success');
      setCharacterMessage('素晴らしい！全てのタスクを完了したな！');
    } else {
      setCharacterStatus('info');
      setCharacterMessage(`残り${incompleteTasks.length}件のタスクがある。頑張れ、勇者よ！`);
    }

  }, [tasks, characterStatus, incompleteTasks]);


  // インポート処理。成功・失敗をトーストで通知
  const handleImport = (jsonString: string) => {
    try {
      const newTasks: Task[] = JSON.parse(jsonString);
      // 簡単なバリデーション
      if (Array.isArray(newTasks) && newTasks.every(t => t.id && t.content && t.dueDate)) {
        originalImportTasks(newTasks);
        toast.success('タスクリストを正常にインポートしました！');
        showSuccessMessage('タスクリストを更新したぞ！');
      } else {
        throw new Error('JSONの形式が無効です。');
      }
    } catch (error) {
      console.error("インポートエラー:", error);
      toast.error('インポートに失敗しました。JSONの形式を確認してください。');
    }
  };
  
  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#44475a',
            color: '#f8f8f2',
            border: '2px solid #6272a4',
          },
          success: {
            iconTheme: {
              primary: '#50fa7b',
              secondary: '#f8f8f2',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff5555',
              secondary: '#f8f8f2',
            },
          },
        }}
      />
      <div className="bg-[#282a36] min-h-screen p-4 sm:p-8 flex items-start justify-center text-[#f8f8f2]">
        <main className="w-full max-w-5xl mx-auto">
          
          <header className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f8f8f2] tracking-tight" style={{fontFamily: "'Press Start 2P', cursive"}}>タスク管理</h1>
            <p className="text-[#6272a4] mt-2 text-lg">生産性の冒険に出よう！</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col items-center">
              <Character status={characterStatus} message={characterMessage} />
              <ShareControls tasks={tasks} onImport={handleImport} />
            </div>

            <div className="lg:col-span-2">
              <TaskInputForm onAddTask={addTask} />

              <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
                <TaskList
                  title="未完了のタスク"
                  tasks={incompleteTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                />
                <TaskList
                  title="完了したタスク"
                  tasks={completedTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;