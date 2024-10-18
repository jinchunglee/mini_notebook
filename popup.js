document.addEventListener('DOMContentLoaded', function() {
    let memoList = document.getElementById('memo-list');
    chrome.storage.sync.get(["memos"], function(result) {
        let memos = result.memos || [];
        memos.forEach(function(memo) {
            let li = document.createElement('li');
            li.textContent = memo;
            memoList.appendChild(li);
        });
    });

    document.getElementById('clear-memos').addEventListener('click', function() {
        chrome.storage.sync.set({ memos: [] }, function() {
            memoList.innerHTML = '';
        });
    });
});
