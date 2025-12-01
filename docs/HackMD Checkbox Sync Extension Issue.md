# HackMD Checkbox Sync Extension Issue

## 問題描述

在 HackMD 網站上，preview 視窗中的 checkbox 是以 HTML `<input type="checkbox">` 的形式呈現，而非 Markdown 的 `- [ ]` 語法。當用戶在 preview 上勾選或取消勾選這些 checkbox 時，該狀態不會自動同步回 edit 視窗的 Markdown 文本中。這導致用戶無法通過 preview 直接更新文檔的 checkbox 狀態，需要手動在 edit 視窗中修改 Markdown。

具體來說：

- Preview 上的 checkbox 勾選後，HTML 會從 `<input type="checkbox">` 變成 `<input type="checkbox" checked>`。
- 但這不會觸發 HackMD 更新 edit 視窗中的對應 Markdown 文本。

## 需求

開發一個 Chrome 瀏覽器擴充功能，實現以下功能：

1. 監聽 HackMD 頁面上的 preview 視窗和 edit 視窗。
2. 檢測 preview 視窗中 checkbox 的狀態變化（勾選或取消勾選）。
3. 自動更新 edit 視窗中對應的 Markdown 文本，將 `- [ ]` 改為 `- [x]` 或反之。
4. 確保同步後 HackMD 能正確保存和更新文檔。

## 技術考量

- 需要使用 Chrome Extension API，如 content scripts 來注入腳本到 HackMD 頁面。
- 監聽 DOM 變化，使用 MutationObserver 或事件監聽器。
- 匹配 preview 和 edit 視窗中的 checkbox 對應關係（可能需要基於位置或 ID）。
- 處理 Markdown 解析和更新，避免破壞其他內容。

## 專案名稱建議

- **專案名稱**：HackMD Checkbox Sync Extension
- **套件名稱**：hackmd-checkbox-sync

## 實施步驟

1. 創建 Chrome Extension 架構（manifest.json, background.js, content.js 等）。
2. 實現 content script 來監聽 preview checkbox 變化。
3. 開發邏輯來映射 preview checkbox 到 edit Markdown。
4. 更新 edit 視窗的 textarea 或編輯器內容。
5. 測試與 HackMD 的兼容性。
