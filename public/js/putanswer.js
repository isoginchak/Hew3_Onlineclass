function formPut(id) {

    const inputTextClass = document.getElementById('form-' + id).children;
    const inputText = inputTextClass[1].value;

    if (inputText == "") {
        //記載なし
        return;
    }

    //Ajax
    const answerData = { id: id, answer: inputText, solve: 1 };
    // JSON 形式への変換
    let answerDataJSON = JSON.stringify(answerData);
    putQuestion(answerDataJSON);


}


async function putQuestion(answerDataJSON) {
    try {
        const res = await axios.post(`/putanswer`, answerDataJSON, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //リダイレクト
        location.href='/mypage-question';


    } catch (e) {
        console.log(e)
    }
}
