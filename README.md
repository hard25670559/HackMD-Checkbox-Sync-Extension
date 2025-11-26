# HackMD Checkbox Sync Extension

一個 Chrome 瀏覽器擴充功能，用於同步 HackMD 頁面中 preview 視窗的 HTML checkbox 狀態到 edit 視窗的 HTML 屬性。

## 功能特性

- **即時同步**：當用戶在 HackMD 的 preview 視窗中勾選或取消勾選 HTML checkbox 時，自動更新 edit 視窗中對應的 HTML 屬性。
- **雙向映射**：精確匹配 preview 中的 HTML checkbox 與 edit 中的對應項目，實現從 preview 到 edit 的同步（雙向映射確保映射的準確性和一致性）。
- **無縫整合**：與 HackMD 的編輯器完全兼容，不影響文檔的保存和更新。

## 問題背景

在 HackMD 中，preview 視窗可以正常顯示 HTML checkbox 並允許互動，但該互動不會連動影響 edit 視窗上的 HTML 屬性從 `""` 變成 `"checked"` 或 `"checked"` 變成 `""`。原生 HackMD 不支援從 preview 直接同步 HTML checkbox 狀態到 edit 視窗的 HTML，本擴充功能解決了這個問題。

**注意**：本擴充功能監聽 preview 中的 HTML checkbox，並同步狀態到 edit 視窗內的 HTML。

## 安裝說明

1. 下載或複製本專案的源碼。
2. 在 Chrome 瀏覽器中開啟 `chrome://extensions/`。
3. 啟用「開發人員模式」。
4. 點擊「載入未封裝項目」，選擇本專案的根目錄。
5. 擴充功能安裝完成。

## 使用方法

1. 安裝擴充功能後，開啟任何 HackMD 頁面。
2. 在 preview 視窗中勾選或取消勾選 checkbox。
3. edit 視窗中的 HTML 屬性會自動更新對應的狀態。

## 技術實現

- **Chrome Extension API**：使用 content scripts 注入到 HackMD 頁面。
- **DOM 監聽**：利用 MutationObserver 或事件監聽器檢測 HTML checkbox 的狀態變化。
- **映射邏輯**：基於 checkbox 在文檔中的位置或唯一標識符匹配 preview 和 edit 中的對應項目。
- **HTML 更新**：解析並修改 edit 視窗的 textarea 內容，確保不破壞其他 HTML 元素。

## 開發與貢獻

歡迎貢獻！請遵循以下步驟：

1. Fork 本專案。
2. 建立功能分支。
3. 提交變更。
4. 發起 Pull Request。

## 授權

本專案採用 MIT 授權。詳見 [LICENSE](LICENSE) 文件。

## 聯絡

如有問題或建議，請開啟 Issue 或聯絡開發者。
