var tmp = [];

// Áp dụng BinarySearch vào trong đời sống kiểu:
// Applying BinarySearch into life is like:
function BinarySearch(arr, key) {
    var midindex = Math.floor(arr.length/2);
    if (arr.length < 1) return false;
    if (arr[midindex] === key) return true;
    else if (arr[midindex] > key )
        return BinarySearch(arr.slice(midindex), key);
    else
        return BinarySearch(arr.slice(0,midindex),key);

}

function _show_(elementID) {
    var x = document.getElementById(elementID);
    x.style.display = "block";
    tmp.sort();
    if (!BinarySearch(tmp, elementID))
        tmp.push(elementID);
}
function _close_(elementID) {
    var x = document.getElementById(elementID);
    x.style.display = "none";
    tmp.sort();
    if (BinarySearch(tmp, elementID)) {
        const ind = tmp.indexOf(elementID);
        tmp.splice(ind,1);
    }
}