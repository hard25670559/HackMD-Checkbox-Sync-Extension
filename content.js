// content.js for HackMD Checkbox Sync Extension
(() => {
  'use strict';
  console.log('HackMD Checkbox Sync Extension initializing...', window);



  // 等待頁面載入
  window.addEventListener('load', initialize);
  let checkboxListeners = [];  // 儲存每個 checkbox 的監聽器函數

  function initialize() {

    const tool = window.editor;
    if (!tool) {
      console.error('Editor tool not found');
      return;
    }

    console.log('Window object:', window);
    console.log('Editor tool found:', tool);

    let checkboxes = [...document.querySelectorAll('#doc input[type=checkbox]')];


    console.log('Found checkboxes in preview:', checkboxes.length);

    tool.on('change', () => {
      console.log('Editor content changed, updating checkbox listeners');
      checkboxes.forEach((checkbox, index) => {
        checkbox.removeEventListener('change', checkboxListeners[index]);
      });

      checkboxes = [...document.querySelectorAll('#doc input[type=checkbox]')];
      registerAllCheckboxListeners(checkboxes, tool);
    });


    registerAllCheckboxListeners(checkboxes, tool);
    console.log('HackMD Checkbox Sync Extension loaded');
  }

  function registerAllCheckboxListeners(checkboxes, tool) {
    checkboxes.forEach((checkbox, index) => {
      const listener = (e) => abc(e, index, tool);
      checkboxListeners[index] = listener;
      checkbox.addEventListener('change', listener);
    });

    console.log('Registered checkbox listeners for', checkboxes.length, 'checkboxes');
  }

  function abc(e, index, tool) {
    console.log('Checkbox event:', e.target.ownerDocument.defaultView);
    console.log('Checkbox changed in preview', index);
    const originalText = tool.getValue();
    const modifiedText = toggleCheckbox(originalText, index);
    if (!modifiedText) {
      console.log('No changes made to editor content');
      return;
    }
    tool.setValue(modifiedText);
    console.log('Updated editor content');
  }

  function toggleCheckbox(text, N) {
    const regex = /(<input type="checkbox"(?:\s+(?:checked|check|disabled))*\s*\/>)|(- \[[ x]\])/g;
    let matches = text.match(regex);

    if (!matches || !matches[N]) {
      console.log('未找到第', N, '個 checkbox');
      return;  // 返回原始文本
    }

    // 不處理 - [ ] 和 - [x] 格式
    if (matches[N].startsWith('- [')) {
      console.log('第', N, '個 checkbox 為 - [ ] 或 - [x] 格式，跳過處理');
      return;
    }

    // 不處理disabled的checkbox
    if (matches[N].includes('disabled')) {
      console.log('第', N, '個 checkbox 為 disabled，跳過處理');
      return;
    }

    let target = matches[N];
    let replacement;
    if (target.includes('checked')) {
      replacement = '<input type="checkbox" />';  // 移除 checked
    } else {
      replacement = '<input type="checkbox" checked />';  // 添加 checked
    }

    // 替換第 N 個
    let count = 0;
    let modifiedText = text.replace(regex, (match) => {
      if (count === N) {
        count++;
        return replacement;
      }
      count++;
      return match;
    });

    return modifiedText;
  }

  return initialize;
})();
