<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>OnlineClass/マイページ</title>
</head>
<body>
    <header>

    </header>

    <div class="menubar">
     @if(Auth::user()->position===0)
        <p>生徒</p>
        @foreach ($classes as $class)
            <a href="/student-meeting?meetingid={{ $class->hash }}">{{ $class->class_name }}</a>
        @endforeach
    @else
        <p>教師</p>
         @foreach ($classes as $class)
             <a href="/teacher-meeting?meetingid={{ $class->hash }}">{{ $class->class_name }}</a>
         @endforeach
    @endif 


    </div>
    <div>
        
    </div>



    


    <footer>

    </footer>
    
</body>
</html>