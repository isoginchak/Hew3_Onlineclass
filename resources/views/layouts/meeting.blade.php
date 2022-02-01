<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ミーティングルーム</title>
    <link rel="icon" href="{{ asset('images/favicon.png')}}">
    <link rel="stylesheet" href="{{ asset('css/meeting/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sanitize.css') }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons%7CMaterial+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="{{ asset('js/skyway.js') }}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>

    <div class="container">
        @yield('content')
        <!-- <div class="room">
            <div class="mvideo">
                <video id="js-local-stream" muted="muted" autoplay playsinline></video>
                <div class="set-up-bar">
                    <a id="video-btn"><i class="material-icons icon-size pointer" id="video-i">videocam</i><i class="material-icons icon-size pointer" id="video-error">error</i></a>
                    <a id="audio-btn"><i class="material-icons icon-size pointer" id="volume-i">volume_off</i></a>
                    <a id="screensharing"><i class="material-icons-outlined icon-size pointer" id="volume-i">screen_share</i></a>
                    <a id="member-show"><i class="material-icons-outlined icon-size pointer" id="member-i">people_alte</i></a>
                    <a id="js-leave-trigger"><i class="material-icons icon-size pointer">exit_to_app</i></a>
                </div>
            </div>
            <div class="remote-streams" id="js-remote-streams"></div>

            <div class="message-box">
                <div class="messages" id="js-messages"></div>
                <div class="msg-form">
                    <input type="text" id="js-local-text">
                    <a id="js-send-trigger"><i class="material-icons icon-small-size pointer">send</i></a>
                </div>
            </div>
        </div> -->

    </div>

    @yield('script')
    <!-- <script>
        const sessionId = '{{Auth::user()->id}}';
        const sessionFamilyName = '{{Auth::user()->family_name}}';
        const sessionFirstName = '{{Auth::user()->first_name}}';
    </script>
    <script src="{{ asset('js/key.js') }}"></script>
    <script src="{{ asset('js/utils.js') }}"></script>
    <script src="{{ asset('js/meeting.js') }}"></script> -->

</body>

</html>