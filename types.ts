
/**
 * タスクオブジェクトの構造を定義するインターフェース
 */
export interface Task {
  id: string; // 一意のID
  content: string; // タスクの内容
  dueDate: string; // 期限 (ISO 8601形式の文字列)
  createdAt: string; // 作成日時 (ISO 8601形式の文字列)
  isComplete: boolean; // 完了状態
  notifiedPreDeadline?: boolean; // 期限前通知が送信されたかどうかのフラグ
  lastOverdueNotification?: string; // 最終の期限切れ通知日時 (ISO 8601形式の文字列)
}