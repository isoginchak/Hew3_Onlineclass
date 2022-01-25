let tableoutputed = false;

function tableoutput() {
    const saturday = document.getElementById('saturday');
    const sunday = document.getElementById('sunday');
    const step2 = document.getElementById('step2');
    const timeTable = document.getElementById('timetable-simulation');
    const tr1 = document.getElementById('tr-1');
    const sutTh = document.createElement('th');
    const sunTh = document.createElement('th');
    let schoolNum = Number(document.getElementById('class-num').value);
    let weekSelect = document.getElementById('week-select');
    let starttimeSelect = document.getElementById('starttime-select');
    let endtimeSelect = document.getElementById('endtime-select');
    let satOption = document.createElement('option');
    let sunption = document.createElement('option');

    //ボタンが押されたかのブーリアン
    tableoutputed = true;
    //表の表示
    step2.style.visibility = 'visible';
    //曜日増加
    if (saturday.checked) { //土曜日にチェックが入っている
        //表に追加
        sutTh.textContent = '土';
        tr1.appendChild(sutTh);
        //ドロップダウンの選択肢の追加
        satOption.text = '土';
        satOption.value = 'saturday';
        weekSelect.appendChild(satOption);
    }
    if (sunday.checked) { //日曜日にチェックが入っている

        sunTh.textContent = '日';
        tr1.appendChild(sunTh);
        //ドロップダウンの選択肢の追加
        sunption.text = '日';
        sunption.value = 'sunday';
        weekSelect.appendChild(sunption);
    }

    //時限選択
    for (i = 4; i <= schoolNum; i++) {
        let startTimeOption = document.createElement('option');
        let endTimeOption = document.createElement('option');
        //テーブルの追加
        let newRow = timeTable.insertRow();
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(i);
        newCell.appendChild(newText);
        //ドロップダウンの選択肢の追加
        startTimeOption.text = i;
        startTimeOption.value = i;
        endTimeOption.text = i;
        endTimeOption.value = i;
        starttimeSelect.appendChild(startTimeOption);
        endtimeSelect.appendChild(endTimeOption);
        //idつきのtdの追加
        for (j = 4; j <= schoolNum; j++){
            
        }
    }
}

//授業を追加ボタンを押される
function classappend() {
    if (tableoutputed) {
        //変数指定
        let lessonName = document.getElementById('lessonname-text').value;
        let startTime = document.getElementById('starttime-select').value;
        let selectWeek = document.getElementById('week-select').value;
        let endTime = document.getElementById('endtime-select').value;
        let outputBox = document.getElementById('class-list');
        let newElement = document.createElement('p');
        let newText;
        let changeWeekName;


        //エラー処理
        if (lessonName == ''){
            return;
        }
        if (startTime  == ''){
            return;
        }
        if (endTime == ''){
            return;
        }
        if (selectWeek  == ''){
            return;
        }


        //ボタンの下に内容表示
        newElement.textContent = lessonName+' '+selectWeek+' '+startTime+'限 ～ '+endTime+'限 ';
        outputBox.appendChild(newElement);
        
        //表に反映

        //表を色付け
        //スタートタイムに授業名を追加


    } else {
        Swal.fire('STEP1を完了させてください');
    }

}