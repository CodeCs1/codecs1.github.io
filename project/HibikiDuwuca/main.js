var tmp = [];

// Áp dụng BinarySearch vào trong đời sống kiểu:
// Applying BinarySearch into life is like:
function BinarySearch(arr, key, start, end) {
    var midindex = Math.floor((start+end)/2);
    if (start > end) return false;
    if (arr[midindex] === key) return true;
    else if (arr[midindex] < key )
        return BinarySearch(arr, key,midindex+1,end);
    else
        return BinarySearch(arr,key, start, midindex-1);

}

function _show_(elementID) {
    var x = document.getElementById(elementID);
    if (x == null) { alert("Element ID '" + elementID + "' not found!"); return; }
    x.style.display = "block";
    tmp.sort();
    if (!BinarySearch(tmp, elementID,0,tmp.length))
        tmp.push(elementID);
}
function _close_(elementID) {
    var x = document.getElementById(elementID);
    if (x == null) { alert("Element ID '" + elementID + "' not found!"); return; }
    x.style.display = "none";
    tmp.sort();
    if (BinarySearch(tmp, elementID,0,tmp.length)) {
        const ind = tmp.indexOf(elementID);
        tmp.splice(ind,1);
    }
}

let lang = 0; // 0 -> EN; 1 -> JP

function getCookieValue(name) {
    const r = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(r);
    if (match) return match[2];
}

function changeBefore() {
    lang = getCookieValue('lang');
    if (lang == 1) {
        var wbar = document.querySelectorAll(".wbar .content");
        wbar[0].childNodes[1].textContent = "ダウンロード";
        wbar[0].childNodes[3].textContent = "方法";
        wbar[0].childNodes[5].textContent = "プロジェクトについて";
        wbar[0].childNodes[7].textContent = "Change to English";
    }
}

function change() {
    console.log(document.querySelectorAll(".upper .content")[0].childNodes);
    lang = getCookieValue('lang');
    if (lang == 0) {
        //bar
        var wbar = document.querySelectorAll(".wbar .content");
        wbar[0].childNodes[1].textContent = "ダウンロード";
        wbar[0].childNodes[3].textContent = "方法";
        wbar[0].childNodes[5].textContent = "プロジェクトについて";
        wbar[0].childNodes[7].textContent = "Change to English";
        document.cookie = "lang = 1;";
    } else if (lang == 1) {
        //bar
        var wbar = document.querySelectorAll(".wbar .content");
        wbar[0].childNodes[1].textContent = "Download";
        wbar[0].childNodes[3].textContent = "HowTo";
        wbar[0].childNodes[5].textContent = "About this project";
        wbar[0].childNodes[7].textContent = "日本語に変更";
        document.cookie = "lang = 0;";
    }
}