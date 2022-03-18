@extends('layouts.mypage')
@section('title','OnlineClass/出席ログ')
@section('content-icon','assessment')
@section('content-title','出席ログ')

@section('content')

<?php

function s2h($seconds)
{

    $hours = floor($seconds / 3600);
    $minutes = floor(($seconds / 60) % 60);
    $seconds = $seconds % 60;

    ($hours == 0) ? $hours_str = '' : $hours_str = $hours . '時間';
    ($minutes == 0) ? $minutes_str = '' : $minutes_str = $minutes . '分';
    ($seconds == 0) ? $seconds_str = '' : $seconds_str = $seconds . '秒';

    $hms = $hours_str . $minutes_str . $seconds_str;

    return $hms;
}

function  timeDifference($enter_time, $leave_time)
{
    //タイムスタンプの差を計算
    $difSeconds = strtotime($leave_time) - strtotime($enter_time);
    $str_time = s2h($difSeconds);
    return  $str_time;
}

?>

<div class="logs-wrap">
    <table class="logs-table">
        <th>教科</th>
        <th>氏名</th>
        <th>入室時間</th>
        <th>退出時間</th>
        <th>滞在時間</th>
        <th>合計顔不検出時間</th>
        <th>最大顔不検出時間</th>


        @foreach ( $logs as $log)
        @if( $log ->enter_time!=$log ->leave_time)
        <tr>
            <td>
                {{ $log -> class_name  }}
            </td>
            <td>
                {{ $log -> family_name  }} {{ $log -> first_name  }}
            </td>
            <td>
                {{ $log ->enter_time }}
            </td>
            <td>
                {{ $log ->leave_time }}
            </td>
            <td>
                <?php
                $difference_time =  timeDifference($log->enter_time, $log->leave_time);
                ?>
                {{ $difference_time}}
            </td>
            <td>
                <?php
                $total_time =  s2h($log->total_noface_time);
                ?>
                {{ $total_time }}
            </td>

            <td>
                <?php
                $max_time =  s2h($log->max_noface_time);
                ?>
                {{ $max_time }}
            </td>

        </tr>
        @endif
        @endforeach
    </table>




</div>

@endsection