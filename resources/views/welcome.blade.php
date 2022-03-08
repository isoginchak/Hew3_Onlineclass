<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('css/top/sanitize.css') }}">
    <link rel="stylesheet" href="{{ asset('css/top/style.css') }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>OnlineClass/トップページ</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
    <link href="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css" rel="stylesheet">

</head>

<body>
    <div class="wrapper-1">
        <div class="menubar">
            <div class="logo-wrap">
                <a href="#">
                    <img src="/img/logo.png" alt="ロゴ" class="logo">
                </a>
            </div>
            <div class="menu-wrap">
                <ul class="menu-ul">
                    <li><a href="#content1" class="colorb">OnlineClassとは</a></li>
                    <li><a href="#content2" class="colorb">機能</a></li>
                    <li><a href="#content3" class="colorb">ご利用方法</a></li>
                    <li class="circle-border"><a href="{{ route('login') }}" class="colorf">ログイン・会員登録</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="top-img">
        <div class="caption-wrap">
            <p>学校のオンライン授業を<br>より受けやすく。</p>
        </div>
    </div>
    <div class="wrapper">
        <section>
            <div data-aos="fade-up" id="content1">
                <h2>About</h2>
                <h1>OnlineClassとは</h1>
                <hr class="sec-hr">
                <p class="des">OnlineClassは今までオンライン授業を体験して、教師からの視点
                    <br>生徒からの視点での<strong>不満や使いづらさ</strong>を解消したの授業用のミーテイングアプリです。
                </p>
            </div>
            <img src="/img/topimg2.jpg" alt="PC" class="img2" data-aos="fade-up">
        </section>

        <section>
            <div data-aos="fade-up" id="content2">
                <h2>Features</h2>
                <h1>機能</h1>
                <hr class="sec-hr">
                <p class="des">従来のミーティングアプリにオンライン授業で役立つ機能を追加しました。</p>
            </div>
            <div class="card-wrap" data-aos="fade-up">
                <div class="card">
                    <h3>01</h3>
                    <i class="material-icons-outlined">face</i>
                    <h4>顔認識機能</h4>
                    <hr class="card-hr">
                    <p class="card-des">
                        生徒がwebカメラをつけると授業を受けているか、分かるようになります。
                    </p>
                </div>
                <div class="card">
                    <h3>02</h3>
                    <i class="material-icons-outlined">live_help</i>
                    <h4>質問箱</h4>
                    <hr class="card-hr">
                    <p class="card-des">
                        生徒は授業中にいつでも質問でき、<br>教師は授業後に質問に解答できいつでも<br>閲覧できます。
                    </p>
                </div>
                <div class="card">
                    <h3>03</h3>
                    <i class="material-icons-outlined">mouse</i>
                    <h4>ワンクリックで入室</h4>
                    <hr class="card-hr">
                    <p class="card-des">
                        面倒なIDやパスワードの入力をなくし<br>ワンクリックで入室できるように<br>なりました。
                    </p>
                </div>
            </div>
        </section>
        <section>
            <div data-aos="fade-up" id="content3">
                <h2>How to</h2>
                <h1>ご利用方法</h1>
                <hr class="sec-hr">
                <p class="des">
                    仮で発行した教師用メールアドレス・生徒用メールアドレスでログインすると試す事ができます。<br>

                </p>
            </div>
            <div class="howto-wrap" data-aos="fade-up">
                <div class="teacher-wrap howto-box">
                    <div class="img-box">
                        <img src="/img/teacher2.png" alt="" class="howtoimg">
                        <p class="howto-p">教師アカウント</p>
                        <p class="id-p">MAIL:aaa@aaa.com<br>PASS:2023online</p>
                        <div class="white-box">
                            <i class="material-icons-outlined"> mouse</i>
                            <p> 時間割をクリック</p>
                        </div>
                        <div class="triangle"></div>
                        <div class="white-box">
                            <i class="material-icons-outlined">videocam</i>
                            <p> ミーティングの起動</p>
                        </div>
                        <div class="triangle"></div>
                        <p class="fe-p">利用できる機能</p>
                        <div class="white-box">
                            <i class="material-icons-outlined">chat</i>
                            <p>チャット</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">screen_share</i>
                            <p>画面共有</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">people</i>
                            <p>入室者の確認</p>
                        </div>
                        <p class="fe-p">マイページ</p>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">question_answer</i>
                            <p>質問への回答</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">feed</i>
                            <p>お知らせの送信</p>
                        </div>


                    </div>

                </div>
                <div class="student-wrap howto-box">
                    <div class="img-box">
                        <img src="/img/student.png" alt="" class="howtoimg">
                        <p class="howto-p">生徒アカウント</p>
                        <p class="id-p">MAIL:bbb@bbb.com<br>PASS:2023online</p>
                        <div class="white-box">
                            <i class="material-icons-outlined"> mouse</i>
                            <p> 時間割をクリック</p>
                        </div>
                        <div class="triangle"></div>
                        <div class="white-box">
                            <i class="material-icons-outlined">videocam</i>
                            <p> ミーティングの起動</p>
                        </div>
                        <div class="triangle"></div>
                        <p class="fe-p">利用できる機能</p>
                        <div class="white-box">
                            <i class="material-icons-outlined">chat</i>
                            <p>チャット</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">screen_share</i>
                            <p>画面共有</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined half-i2">people</i>
                            <p>入室者の確認</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined">face</i>
                            <p>顔認識機能</p>
                        </div>
                        <div class="white-box">
                            <i class="material-icons-outlined">help_outline</i>
                            <p>質問の送信</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <a href="{{ route('login') }}">
            <div class="start-box">
                <p>早速使ってみましょう</p>
            </div>
        </a>




    </div>
    <script src="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js"></script>
    <script src="{{ asset('js/fadein.js') }}"></script>
</body>

</html>