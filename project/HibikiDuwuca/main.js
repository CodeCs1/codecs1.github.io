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

function getCookieValue(name) {
    const r = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(r);
    if (match) return match[2];
    else document.cookie = localStorage.getItem(name)
}

function changeBefore() {
    lang = getCookieValue('lang');
    if (lang == 1) {
        var wbar = document.querySelectorAll(".wbar .content");
        wbar[0].childNodes[1].textContent = "ダウンロード";
        wbar[0].childNodes[3].textContent = "方法";
        wbar[0].childNodes[5].textContent = "プロジェクトについて";
        wbar[0].childNodes[7].textContent = "Change to English";
        var upper_content = document.querySelectorAll(".upper .content");
        upper_content[0].childNodes[1].textContent = "響 ゆうか リナックス システム";
        upper_content[0].childNodes[1].style.fontFamily = "Klee One";
    }
}

function change() {
    document.cookie = localStorage.getItem("lang");
    lang = getCookieValue('lang');
    var wbar = document.querySelectorAll(".wbar .content");
    var upper_content = document.querySelectorAll(".upper .content");
    if (lang == 0) {
        //bar
        wbar[0].childNodes[1].textContent = "ダウンロード";
        wbar[0].childNodes[3].textContent = "方法";
        wbar[0].childNodes[5].textContent = "プロジェクトについて";
        wbar[0].childNodes[7].textContent = "Change to English";
        upper_content[0].childNodes[1].textContent = "響 ゆうか リナックス システム";
        upper_content[0].childNodes[1].style.fontFamily = "Klee One";
        document.cookie = "lang = 1;";
        localStorage.setItem("lang", "1");
    } else if (lang == 1) {
        //bar
        wbar[0].childNodes[1].textContent = "Download";
        wbar[0].childNodes[3].textContent = "HowTo";
        wbar[0].childNodes[5].textContent = "About this project";
        wbar[0].childNodes[7].textContent = "日本語に変更";
        upper_content[0].childNodes[1].textContent = "Hibiki Duwuca Linux System";
        upper_content[0].childNodes[1].style.fontFamily = "Dancing Script";
        document.cookie = "lang = 0;";
        localStorage.setItem("lang", "0");
    }
}