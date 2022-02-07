//時計表示
function clock() {
    const nowTime = new Date(); //  現在日時を得る
    const nowYear = nowTime.getFullYear();
    const nowMoonth = nowTime.getMonth() + 1;
    // 曜日を取得
    const dayNum = nowTime.getDay();
    const weekday = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
    const nowWeek = weekday[dayNum];
    const nowDate = nowTime.getDate();
    const nowHour = nowTime.getHours();
    const nowMin = ('00' + nowTime.getMinutes()).slice(-2);
    const msg = nowYear + "年" + nowMoonth + "月" + nowDate + "日" + nowWeek + nowHour + ":" + nowMin;
    document.getElementById("now-date").innerHTML = msg;
}
window.onload = clock;
setInterval('clock()', 1000);

