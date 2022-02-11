@extends('layouts.mypage')
@section('title','OnlineClass/お知らせ')
@section('content-icon','feed')
@section('content-title','お知らせ')

@section('content')
<div class="newses-wrap">
    <div class="news-wrap">
        @if(Auth::user()->position===1)
        <form action="" class="news-form">
            <input type="text" placeholder="タイトル" class="news-form-title">
            <select name="address" id="news-select">
                <option value="">宛先を選択してください</option>
                <!-- foreachでぐるぐる-->
                <option value="">Dog</option>
                <!-- foreachでぐるぐる-->

            </select>
            <div class="news-textarea">

                <textarea class="texxtarea" rows="4" placeholder="本文を入力してください"></textarea>

            </div>
            <div class="submit">
                <input type="submit" class="news-submit">
            </div>
        </form>
        <hr class="news-hr">
        @endif


        <dl class="accordion js-accordion">
            @foreach ( $newses as $news )


            <!-- foreachでぐるぐる-->
            <div class="accordion__item js-accordion-trigger">
                <dt class="accordion__title"><span class="news-date">{{ $news -> created_at->format('Y/m/d')  }}</span>&#12298{{ $news -> class_name  }}&#12299 {{ $news -> news_title  }}</dt>
                <dd class="accordion__content">{{ $news -> news_content  }}</dd>
            </div>
            <!-- foreachでぐるぐる-->
            @endforeach

        </dl>





    </div>



</div>

@endsection

@section('script')
<script src="{{ asset('js/news.js') }}"></script>
@endsection