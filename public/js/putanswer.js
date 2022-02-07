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
    putQuestion(answerDataJSON,id);


}


async function putQuestion(answerDataJSON,id) {
    try {
        const res = await axios.post(`/putanswer`, answerDataJSON, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res)

    } catch (e) {
        console.log(e)
    }
}
