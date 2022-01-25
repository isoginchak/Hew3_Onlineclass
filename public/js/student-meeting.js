const helpIcon = document.getElementById('question-box');
const leavingToggle = document.getElementById('leaving-toggle');



//質問箱
helpIcon.addEventListener('click', helpBtnClick);
function helpBtnClick() {
    swal.fire({
        title: "質問内容を入力してください",
        input: "textarea",
        confirmButtonColor: '#5CA0E8'
    }).then((result) => {
        if (result.value == "") return;
        else {
            swal.fire({
                title: "質問内容を確認",
                text: result.value,
                confirmButtonText: '送信',
                showCancelButton: true,
                cancelButtonText: 'キャンセル',
                reverseButtons: true,
                confirmButtonColor: '#5CA0E8',
                cancelButtonColor: '#9ca2a8'
            })
        }
    })

}

//離席トグル
leavingToggle.addEventListener('click', leavingToggleClick)
function leavingToggleClick() {
    if (leavingToggle.checked) {
        swal.fire({
            title: "離席内容を選択してください",
            input: "select",
            inputOptions: {
                '0': 'お手洗い',
                '1': '郵便受取り',
                '2': 'その他',
            },
            inputPlaceholder: '離席内容を選択',
            confirmButtonColor: '#5CA0E8',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: '送信',
            cancelButtonText: 'キャンセル',
            cancelButtonColor: '#9ca2a8',
        }).then(result => {
            if (!result.isConfirmed) {
                leavingToggle.checked = false;
            }
        })
    }
}







