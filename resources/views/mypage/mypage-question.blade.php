@extends('layouts.mypage')
@section('title','OnlineClass/質問と回答')
@section('content-icon','help_center')
@section('content-title','質問と回答')

@section('content')
<div class="questions-wrap">

    @foreach ( $questions as $question )
    <div class="question-wrap">
        <div class="question">
            <div class="q-name-content">
                <p>科目名: {{ $question->class_name}}<br> 送信者:{{ $question->family_name}} {{ $question->first_name}}</p>
            </div>
            <div class="q-wrap">
                <p class="q-logo">Q</p>
                <div class="q-text">
                    <p> {{ $question->question}}</p>
                </div>

            </div>
            <div class="question-date">
                <p> {{ $question->created_at}}</p>
            </div>
            @if( $question->solve==0 && Auth::user()->position===1)
            <div class="form">
                <div class="a-wrap" id="form-{{$question->question_id}}">
                    <p class="a-logo">！</p>

                    <input name="answer " type="text" class="question-form" placeholder="回答を入力してください">
                </div>
                <div class="submit">
                    <input type="submit" class="question-submit" onclick="formPut( {{ $question -> question_id }} );">
                </div>
            </div>

            @elseif($question->solve==0 && Auth::user()->position===0)
            <div class="a-wrap">
                <p class="a-logo">！</p>
                <div class="a-text">
                    <p>まだお返事がありません</p>
                </div>

            </div>

            @else
            <div class="a-wrap">
                <p class="q-logo">A</p>
                <div class="a-text">
                    <p> {{ $question->answer}}</p>
                </div>

            </div>
            @endif

        </div>
        <hr class="quesrion-hr">

    </div>
    @endforeach

</div>

@endsection
@section('script')
<script src="{{ asset('js/putanswer.js') }}"></script>
@endsection