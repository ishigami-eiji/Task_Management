
import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

// localStorageで使用するキー
const LOCAL_STORAGE_KEY = 'simpleTaskManagerTasks';

interface UseTaskManagerProps {
  onTaskAddSuccess?: () => void;
  onTaskToggleSuccess?: () => void;
  onTaskDeleteSuccess?: () => void;
}
/**
 * タスク管理に関連する全てのロジックを管理するカスタムフック
 */
export const useTaskManager = ( { onTaskAddSuccess, onTaskToggleSuccess, onTaskDeleteSuccess }: UseTaskManagerProps = {}) => {
  // タスクのリストを管理するstate
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("ローカルストレージからのタスク読み込みに失敗しました:", error);
      return [];
    }
  });

  // タスクが変更されるたびにlocalStorageに保存
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("ローカルストレージへのタスク保存に失敗しました:", error);
    }
  }, [tasks]);

  // デスクトップ通知の許可をリクエスト
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  
  // デスクトップ通知を送信する関数
  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }, []);

  // リマインダーチェックのロジック
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      setTasks(currentTasks => 
        currentTasks.map(task => {
          if (task.isComplete) return task;

          const dueDate = new Date(task.dueDate);
          let updatedTask = { ...task };
          let madeUpdate = false;

          // 1. 期限3分前リマインド
          const threeMinutesBefore = new Date(dueDate.getTime() - 3 * 60 * 1000);
          if (now >= threeMinutesBefore && now < dueDate && !task.notifiedPreDeadline) {
            sendNotification(`【まもなく期限】${task.content}`, { body: `期限: ${dueDate.toLocaleString()}` });
            updatedTask.notifiedPreDeadline = true;
            madeUpdate = true;
          }

          // 2. 期限切れリマインド (24時間ごと)
          if (now > dueDate) {
            const lastNotificationDate = task.lastOverdueNotification ? new Date(task.lastOverdueNotification) : null;
            const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

            // 最初の期限切れ通知 (期限から24時間後)
            if (!lastNotificationDate && now.getTime() - dueDate.getTime() >= twentyFourHoursInMillis) {
               sendNotification(`【期限切れです】${task.content}`, { body: `期限: ${dueDate.toLocaleString()}` });
               updatedTask.lastOverdueNotification = now.toISOString();
               madeUpdate = true;
            }
            // 2回目以降の期限切れ通知 (前回の通知から24時間後)
            else if (lastNotificationDate && now.getTime() - lastNotificationDate.getTime() >= twentyFourHoursInMillis) {
               sendNotification(`【期限切れです】${task.content}`, { body: `期限: ${dueDate.toLocaleString()}` });
               updatedTask.lastOverdueNotification = now.toISOString();
               madeUpdate = true;
            }
          }
          
          return madeUpdate ? updatedTask : task;
        })
      );
    };

    // 1分ごとにリマインダーをチェック
    const intervalId = setInterval(checkReminders, 60 * 1000);

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => clearInterval(intervalId);
  }, [sendNotification]);

  // タスクを追加する関数
  const addTask = useCallback((content: string, dueDate: string) => {
    if (!content.trim() || !dueDate) {
      alert("タスクの内容と期限の両方を入力してください。");
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      content,
      dueDate,
      createdAt: new Date().toISOString(),
      isComplete: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    onTaskAddSuccess?.();
  }, [onTaskAddSuccess]);

  // タスクの完了/未完了を切り替える関数
  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
    onTaskToggleSuccess?.();
  }, [onTaskToggleSuccess]);

  // タスクを削除する関数
  const deleteTask = useCallback((id: string) => {
    // 削除前に確認ダイアログを表示
    if (window.confirm("このタスクを本当に削除しますか？")) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        onTaskDeleteSuccess?.();
    }
  }, [onTaskDeleteSuccess]);
  
  // タスクリストをインポート（上書き）する関数
  const importTasks = useCallback((newTasks: Task[]) => {
    if (window.confirm("現在のタスクリストがインポート内容で上書きされます。よろしいですか？")) {
        setTasks(newTasks);
    }
  }, []);

  return { tasks, addTask, toggleTask, deleteTask, importTasks };
};
