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
        if (result.value == "" || result.isConfirmed == false) return;
        else {
            const question = result.value;
            swal.fire({
                title: "質問内容を確認",
                text: result.value,
                input: "radio",
                inputOptions: {
                    '0': '個人的な質問',
                    '1': '回答を全員に共有',
                },
                inputValue: '0',
                confirmButtonText: '送信',
                showCancelButton: true,
                cancelButtonText: 'キャンセル',
                reverseButtons: true,
                confirmButtonColor: '#5CA0E8',
                cancelButtonColor: '#9ca2a8',

            }).then((result2) => {
                if (result2.isConfirmed) {
                    const questionShare = result2.value;
                    //Ajax
                    const questionData = { user_id: sessionId, class_id: meetingId, question: question, share: questionShare };
                    // JSON 形式への変換
                    let questionDataJSON = JSON.stringify(questionData);
                    postQuestion(questionDataJSON);

                }
                else {
                    return;
                }

            })
        }
    })

}

async function postQuestion(questionDataJSON) {
    try {
        const res = await axios.post(`/postquestion`, questionDataJSON, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res)

    } catch (e) {
        console.log(e)
    }
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







