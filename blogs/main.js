if(!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    if (Notification.permission != 'granted') {
        Notification.requestPermission().then(function(n){
            if (p === 'granded') {}
            else { alert("blocked"); }
        }).catch(function(err){
            alert(err);
        });
    }
}

function loadnotification() {
    var notify = new Notification('Message', {
        body: 'Kasane teto ? from Mesmerizer ??',
        icon: '../favicon.ico',
    });
}