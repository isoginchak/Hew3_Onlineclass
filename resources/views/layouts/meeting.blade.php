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
        

    </div>

    @yield('script')
   

</body>

</html>