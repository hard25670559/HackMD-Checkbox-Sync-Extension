(() => {
  // 1. 注入 page script
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('content.js');
  console.log('Injecting script:', script.src);
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
})()
