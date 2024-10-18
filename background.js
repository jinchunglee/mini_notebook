chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "save_memo") {
        chrome.storage.sync.get(["memos"], function(result) {
            let memos = result.memos || [];
            memos.push(request.text);
            chrome.storage.sync.set({ memos: memos });
        });
    }
});
