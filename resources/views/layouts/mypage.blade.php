<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/mypage/style.css') }}">
    <script src="{{ asset('js/app.js') }}" defer></script>

    <title>@yield('title')</title>
</head>

<body>
    <div class="wrap">
        <div class="side">
            <div class="logo"><img src="{{asset('/img/logowhite.png')}}" alt="ロゴ"></div>
            <div class="sidemenu-top">
                <div class="menu menu1">
                    <i class="material-icons-outlined icon-white">calendar_month</i>
                    <p>時間割</p>
                </div>
                <div class="menu  menu-re">
                    <i class="material-icons-outlined icon-white">feed</i>
                    <p>お知らせ</p>
                    <div class="circle-wrap">
                        <div class="circle">

                        </div>
                    </div>
                </div>
                <div class="menu  menu-re">
                    <i class="material-icons-outlined icon-white">help_center</i>
                    <p>質問と回答</p>
                    <div class="circle"></div>
                </div>
                @if (Auth::user()->position===1)
                <div class="menu">
                    <i class="material-icons-outlined icon-white">assessment</i>
                    <p>出席ログ</p>
                </div>
                @endif
            </div>

            <div class="sidemenu-under">
                <div class="menu">
                    <i class="material-icons-outlined icon-white">settings</i>
                    <p>設定</p>
                </div>
                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <div class="menu">
                        <i class="material-icons-outlined icon-white">logout</i>
                        <p>ログアウト</p>
                    </div>
                </a>
            </div>
        </div>


        <div class="main">
            <div class="main-menu">
                <div class="left-menu">
                    <p>2022年2月5日(土)15:00</p>
                </div>
                <div class="right-menu">
                    <i class="material-icons-outlined icon-blue">notifications</i>
                    <div class="account">
                        <i class="material-icons-outlined icon-black">account_circle</i>
                        <p>{{Auth::user()->family_name}} {{Auth::user()->first_name}}
                            @if (Auth::user()->position===1)
                            先生
                            @else
                            さん
                            @endif
                        </p>
                    </div>
                </div>
            </div>

            <div class="title">
                <i class="material-icons-outlined icon-black">@yield('content-icon')</i>
                <p>@yield('content-title')</p>
            </div>

            <div class="article">
                @yield('content')


            </div>

        </div>
    </div>

    </div>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

</body>

</html>