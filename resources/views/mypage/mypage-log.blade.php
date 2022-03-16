@extends('layouts.mypage')
@section('title','OnlineClass/出席ログ')
@section('content-icon','assessment')
@section('content-title','出席ログ')

@section('content')
<div class="logs-wrap">

@foreach ( $logs as $log)
<p>{{ $log -> logs_id  }}</p>

@endforeach
   



</div>

@endsection