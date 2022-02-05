@extends('layouts.mypage')
@section('title','OnlineClass/時間割')
@section('content-icon','calendar_month')
@section('content-title','時間割')

@section('content')
<table>
    <thead>
        <tr>
            <th class="th1">

            </th>
            <th>
                月曜日
            </th>
            <th>
                火曜日
            </th>
            <th>
                水曜日
            </th>
            <th>
                木曜日
            </th>
            <th>
                金曜日
            </th>
            <th>
                土曜日
            </th>

        </tr>
    </thead>

    @for ($i = 1; $i < 7; $i++) <tr class="timetable">
        <th class="th1">{{$i}}</th>
        @for($j=1;$j < 7; $j++) <td>
            @foreach($classes as $class)
            @if($class->week==$j && $class->start_frame==$i )
           
                @if(Auth::user()->position===0)
                <a href="/student-meeting?meetingid={{ $class->hash }}"><span>{{ $class->class_name }}</span><i class="material-icons-outlined link-icon">
                        open_in_new
                    </i></a>
                @else
                <a href="/teacher-meeting?meetingid={{ $class->hash }}">{{ $class->class_name }}<i class="material-icons-outlined link-icon">
                        open_in_new
                    </i></a>
                @endif
            
            @endif
            @endforeach

            </td>
            @endfor
            </tr>
            @endfor

</table>

@endsection