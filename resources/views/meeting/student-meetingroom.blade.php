@extends('layouts.meeting')
@section('content')
<div class="room">
    <div class="mvideo">
        <div class="video-wrap">
        <div class="big-video"><video id="js-local-stream" muted="muted" autoplay playsinline></video></div>  
        </div>
         <div class="small-video"></div>
        <div class="set-up-bar">
            <div class="face">
                <i class="material-icons-outlined icon-size size1" id="face">face</i>
                <p id="seconds" class="size1"></p>
                <div class="leave-seat">
                    <p>離席</p>
                    <label class="switch-label">
                        <input type="checkbox" class="switch-input" id="leaving-toggle" />
                        <span class="switch-content"></span>
                        <span class="switch-circle"></span>
                    </label>
                </div>
            </div>

            <a id="video-btn"><i class="material-icons icon-size pointer" id="video-i">videocam</i><i class="material-icons icon-size pointer" id="video-error">error</i></a>
            <a id="audio-btn"><i class="material-icons icon-size pointer" id="volume-i">volume_off</i></a>
            <a id="screensharing"><i class="material-icons-outlined icon-size pointer" id="volume-i">screen_share</i></a>
            <a id="question-box"><i class="material-icons-outlined icon-size pointer" id="help-i">live_help</i></a>
            <a id="member-show"><i class="material-icons-outlined icon-size pointer" id="member-i">people_alte</i></a>
            <a id="js-leave-trigger" href="/mypage" onclick="onClickSend();"><i class="material-icons icon-size pointer">exit_to_app</i></a>
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
</div>
@endsection

@section('script')

<script>
    const sessionId = '{{Auth::user()->id}}';
    const sessionFamilyName = '{{Auth::user()->family_name}}';
    const sessionFirstName = '{{Auth::user()->first_name}}';
    const sessionPositon = '{{Auth::user()->position}}';
</script>
<script src="{{ asset('js/key.js') }}"></script>
<script src="{{ asset('js/utils.js') }}"></script>
<script src="{{ asset('js/meeting.js') }}"></script>
<script src="{{ asset('js/student-meeting.js') }}"></script>
<script src="{{ asset('js/face.js') }}"></script>
<script src="{{ asset('js/opencv.js') }}" onload="onCvLoaded();"></script>

@endsection