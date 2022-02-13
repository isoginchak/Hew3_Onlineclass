function newsPost() {

    const newsTitle = document.getElementById('news-title').value;
    const classId = document.getElementById("news-select").value;
    const newsContent = document.getElementById('news-content').value;

    if (newsContent == ""||newsTitle==""||classId =="") {
        //記載なし
        return;
    }

    //Ajax
    const newsData = { user_id: userId, address_class_id: classId , news_title: newsTitle,news_content: newsContent };
    // JSON 形式への変換
    let newsDataJSON = JSON.stringify(newsData);
    postNews(newsDataJSON);


}


async function postNews(newsDataJSON) {
    try {
        const res = await axios.post(`/postnews`, newsDataJSON, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //リダイレクト
        location.href='/mypage-news';


    } catch (e) {
        console.log(e)
    }
}
