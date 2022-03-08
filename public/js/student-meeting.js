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
        // console.log(e)
    }
}

async function postJoinLog(joinDataJSON) {
    try {
        const res = await axios.post(`/postjoinlog`,joinDataJSON, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res)

    } catch (e) {
        // console.log(e)
    }
}









