import React, { useState } from 'react';
import { Task } from '../types';
import { toast } from 'react-hot-toast';
import { PixelButton } from './PixelButton';

interface ShareControlsProps {
  tasks: Task[];
  onImport: (jsonString: string) => void;
}

const ShareControls: React.FC<ShareControlsProps> = ({ tasks, onImport }) => {
  const [importJson, setImportJson] = useState('');

  // タスクリストをクリップボードにコピーする
  const handleExport = () => {
    if (tasks.length === 0) {
      toast.error('エクスポートするタスクがありません。');
      return;
    }
    const jsonString = JSON.stringify(tasks, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        toast.success('タスクリストをクリップボードにコピーしました！');
      })
      .catch(err => {
        console.error("コピーに失敗しました:", err);
        toast.error('コピーに失敗しました。');
      });
  };

  // インポートボタンクリック時の処理
  const handleImportClick = () => {
    if (!importJson.trim()) {
      toast.error('インポートするJSONデータを入力してください。');
      return;
    }
    onImport(importJson);
    setImportJson(''); // 処理後にテキストエリアをクリア
  };

  return (
    <div className="mt-6 p-3 w-full bg-[#44475a]/50 rounded-lg border-2 border-[#6272a4]">
      <h3 className="text-lg font-bold text-[#bd93f9] mb-3 text-center" style={{fontFamily: "'Press Start 2P', cursive"}}>データ共有</h3>
      <div className="space-y-4">
        {/* エクスポート */}
        <PixelButton
          onClick={handleExport}
          color="cyan"
          className="w-full"
        >
          リストを複製
        </PixelButton>
        
        {/* インポート */}
        <div>
          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="仲間のリストをここに貼り付け..."
            className="w-full h-20 px-3 py-2 bg-[#282a36] border-2 border-[#6272a4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50fa7b] focus:border-[#50fa7b] text-sm transition"
          />
          <PixelButton
            onClick={handleImportClick}
            color="green"
            className="w-full mt-2"
          >
            リストを読込
          </PixelButton>
        </div>
      </div>
    </div>
  );
};

export default ShareControls;