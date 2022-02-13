@extends('layouts.mypage')
@section('title','OnlineClass/お知らせ')
@section('content-icon','feed')
@section('content-title','お知らせ')

@section('content')
<div class="newses-wrap">
    <div class="news-wrap">
        @if(Auth::user()->position===1)
        <div class="news-form">
            <input type="text" placeholder="タイトル" class="news-form-title" id="news-title">
            <select name="address" id="news-select">
                <option value="">宛先を選択してください</option>
                @foreach ( $news_classes as $class )
                <option value="{{ $class -> class_id  }}">{{ $class -> class_name  }}</option>
                @endforeach

            </select>
            <div class="news-textarea">

                <textarea class="texxtarea" id="news-content" rows="4" placeholder="本文を入力してください"></textarea>

            </div>
            <div class="submit">
                <button class="news-submit" onClick="newsPost();">送信</button>
            </div>
        </div>
        <hr class="news-hr">
        @endif


        <dl class="accordion js-accordion">
            @foreach ( $newses as $news )
            <div class="accordion__item js-accordion-trigger">
                <dt class="accordion__title"><span class="news-date">{{ $news -> created_at->format('Y/m/d')  }}</span>&#12298{{ $news -> class_name  }}&#12299 {{ $news -> news_title  }}</dt>
                <dd class="accordion__content">{{ $news -> news_content  }}</dd>
            </div>

            @endforeach

        </dl>

    </div>

</div>

@endsection

@section('script')
<script>
    const userId = '{{Auth::user()->id}}';
</script>
<script src="{{ asset('js/accordion.js') }}"></script>
<script src="{{ asset('js/newsrest.js') }}"></script>
@endsection