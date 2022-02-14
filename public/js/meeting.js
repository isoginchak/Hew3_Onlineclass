let usersJsonData;

//ルームID取得
let meetingId = location.search;
meetingId = meetingId.replace('?meetingid=', '');

//PeeriD作成
const stringSessionId = ('0000000000000000' + sessionId).slice(-16);

async function getUsers() {
    try {
        const res = await axios.get(`/rest`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json_string = JSON.stringify(res.data);
        usersJsonData = JSON.parse(json_string);
    } catch (e) {
        console.log(e)
    }
}
window.addEventListener('DOMContentLoaded', async function () {
    await getUsers();

    const Peer = window.Peer;
    //初期設定 ビデオはオン オーディオオフ
    let videoToggle = 1;
    let audioToggle = 0;
    let roomId = meetingId;

    (async function main() {
        const localVideo = document.getElementById('js-local-stream');
        const leaveTrigger = document.getElementById('js-leave-trigger');
        const remoteVideos = document.getElementById('js-remote-streams');
        const localText = document.getElementById('js-local-text');
        const sendTrigger = document.getElementById('js-send-trigger');
        const messages = document.getElementById('js-messages');
        const meta = document.getElementById('js-meta');
        const sdkSrc = document.querySelector('script[src*=skyway]');
        const videoButton = document.getElementById('video-btn');
        const audioButton = document.getElementById('audio-btn');
        const shareButton = document.getElementById('screensharing');
        const videoIcon = document.getElementById('video-i');
        const volumeIcon = document.getElementById('volume-i');
        const videoErr = document.getElementById('video-error');
        const memberIcon = document.getElementById('member-show');
        const bigScreen = document.getElementsByClassName('big-video');
        const smallScreen = document.getElementsByClassName('small-video');
        const teacherJson = usersJsonData.find((u) => u.position === 1);
        const teacherId = teacherJson.id;


        let key = false;
        let localStream;
        let faceNone = [];
        let teacher;


        if (sessionPositon == 0) {
            //顔認識起動
            onReady();
        }

        //webカメラ・ビデオの取得
        try {
            //ビデオマイク
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } catch (err) {
            //マイクのみ
            console.log('エラー');
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            videoToggle = -1;
            videoIcon.innerHTML = 'videocam_off';
            videoErr.style.display = 'inline';
        }

        // Render local stream
        localVideo.muted = true;
        localVideo.srcObject = localStream;
        localVideo.playsInline = true;
        await localVideo.play().catch(console.error);

        const timestamp = Math.floor(Date.now() / 1000);

        //クレデンシャル
        const credential = {
            peerId: stringSessionId,
            timestamp: timestamp,
            ttl: 3900,
            authToken: calculateAuthToken(stringSessionId, timestamp)
        };

        //hash化
        function calculateAuthToken(peerId, timestamp) {
            const hash = CryptoJS.HmacSHA256(`${timestamp}:3900:${peerId}`, window.__SKYWAY_KEY__);
            return CryptoJS.enc.Base64.stringify(hash);
        }

        // 自分のpeer作成
        const peer = (window.peer = new Peer(stringSessionId, {
            key: window.__SKYWAY_KEY__,
            debug: 1,
            credential: credential,

        }));


        //初期設定は音声ミュート
        localStream.getAudioTracks().forEach((track) => (track.enabled = false));

        //ビデオのミュート
        videoButton.addEventListener('click', videoBtnClick);

        function videoBtnClick() {
            if (videoToggle == -1) return;

            if (videoToggle == 0) { //ビデオをつける
                localStream.getVideoTracks().forEach((track) => (track.enabled = true));
                videoToggle = 1;
                videoIcon.innerHTML = 'videocam';


            } else { //ビデオを消す

                localStream.getVideoTracks().forEach((track) => (track.enabled = false));
                videoToggle = 0;
                isStreaming = false;
                videoIcon.innerHTML = 'videocam_off';
            }
        }

        //音声のミュート
        audioButton.addEventListener('click', audioBtnClick);

        function audioBtnClick() {
            if (audioToggle == 0) { //音声をつける
                localStream.getAudioTracks().forEach((track) => (track.enabled = true));
                audioToggle = 1;
                volumeIcon.innerHTML = 'volume_up';

            } else {//音声を消す
                localStream.getAudioTracks().forEach((track) => (track.enabled = false));
                audioToggle = 0;
                volumeIcon.innerHTML = 'volume_off';
            }
        }
        //入室
        function joinRoom() {

            if (sessionPositon == 0) {
                //顔認識起動
                onReady();

            }

            console.log('join');
            if (!peer.open) return;

            //roomの選択
            const room = peer.joinRoom(roomId, {
                mode: 'sfu',
                stream: localStream,
            });

            room.once('open', () => {
                messages.innerHTML += "入室しました<br class='space'>";
                if (sessionPositon == 0) {
                    //教師が先にいるか確認
                    teacherExist();
                }
            });


            room.on('peerJoin', peerId => {
                const intruder = Number(`${peerId}`);
                //ID検索
                const result = usersJsonData.find((u) => u.id === intruder);
                messages.innerHTML += result.family_name + ' ' + result.first_name + 'さんが入室<br class="space">';
                //入室者が先生なら
                if (result.id == teacherId) {
                    teacherIn();
                }

            });

            // 他のユーザのビデオを受信した時
            room.on('stream', async stream => {
                const newVideo = document.createElement('video');
                newVideo.srcObject = stream;
                newVideo.playsInline = true;
                newVideo.setAttribute('data-peer-id', stream.peerId);
                remoteVideos.append(newVideo);
                await newVideo.play().catch(console.error);
            });


            //メッセージの受信
            room.on('data', ({
                data,
                src
            }) => {
                if (`${data}` == 'skywayhideen0') {
                    //顔が検出されない
                    if (!faceNone.includes(Number(`${src}`))) {
                        faceNone.push(Number(`${src}`));
                    }

                }
                else if (`${data}` == 'skywayhideen1') {
                    //顔が検出される
                    faceNone = faceNone.filter(function (x) { return x != Number(`${src}`) });
                }
                else if (`${data}` == 'skywayhideen9') {
                    teacher = Number(`${src}`);
                }
                else {
                    const now = new Date();
                    const hour = now.getHours();
                    const min = ('0' + now.getMinutes()).slice(-2);
                    const sender = Number(`${src}`);
                    // //ID検索
                    const result = usersJsonData.find((u) => u.id === sender);
                    // 送信されたメッセージと送信者を表示
                    messages.innerHTML += "<span class='sender-box'>" + result.family_name + ' ' + result.first_name + "</span><br><div class='sender-message-box'>" + `${data}` + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";
                }
            });

            // メンバーの退出
            room.on('peerLeave', peerId => {
                const remoteVideo = remoteVideos.querySelector(
                    `[data-peer-id='${peerId}']`
                );
                remoteVideo.srcObject.getTracks().forEach(track => track.stop());
                remoteVideo.srcObject = null;
                remoteVideo.remove();
                const exiters = Number(`${peerId}`);
                //ID検索
                const result = usersJsonData.find((u) => u.id === exiters);
                messages.innerHTML += result.family_name + ' ' + result.first_name + 'さんが退出<br  class="space">';

                if (result.id == teacherId) {
                    teacherLeave();
                }
            });

            // 自身の退出
            room.once('close', () => {
                sendTrigger.removeEventListener('click', onClickSend);
                messages.innerHTML += '== You left ===\n';
                shareButton.style.display = 'none';
                Array.from(remoteVideos.children).forEach(remoteVideo => {
                    remoteVideo.srcObject.getTracks().forEach(track => track.stop());
                    remoteVideo.srcObject = null;
                    remoteVideo.remove();
                    window.location.href = '/mypage';

                });
            });

            sendTrigger.addEventListener('click', onClickSend);
            leaveTrigger.addEventListener('click', () => room.close(), {
                once: true
            });

            //メッセージの送信
            function onClickSend() {
                //空文字は送信できない
                if (localText.value == '') return;
                const escapeText = escapeHtml(localText.value);
                const now = new Date();
                const hour = now.getHours();
                const min = ('0' + now.getMinutes()).slice(-2);
                // webscketを介してメッセージの送信
                room.send(escapeText);
                messages.innerHTML += "<span class='sender-box'>" + sessionFamilyName + ' ' + sessionFirstName + "</span><br><div class='my-message-box '>" + escapeText + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";
                localText.value = '';
            }

            //テキストのエスケープ処理
            function escapeHtml(string) {
                if (typeof string !== 'string') {
                    return string;
                }
                return string.replace(/[&'`"<>]/g, function (match) {
                    return {
                        '&': '&amp;',
                        "'": '&#x27;',
                        '`': '&#x60;',
                        '"': '&quot;',
                        '<': '&lt;',
                        '>': '&gt;',
                    }[match]
                });
            }

            //画面共有
            shareButton.addEventListener('click', shareBtnClick);

            function shareBtnClick() {

                //画面の取得
                const shareStream = navigator.mediaDevices
                    .getDisplayMedia({
                        video: true
                    })
                    .then(goshare)
                    .catch(console.error);

                function goshare(mediaStream) {
                    //通話音と画面共有の取得
                    const displayVideoTrack = mediaStream.getVideoTracks()[0];
                    const userAudioTrack = localStream.getAudioTracks()[0];
                    //組み合わせる
                    const sharingMediaStream = new MediaStream([displayVideoTrack, userAudioTrack]);
                    localVideo.srcObject = sharingMediaStream;
                    //切り替え
                    room.replaceStream(sharingMediaStream);
                    localVideo.playsInline = true;
                    localVideo.play().catch(console.error);
                    videoToggle = 0;
                    //共有停止
                    sharingMediaStream.getVideoTracks()[0].onended = function () {
                        //画面共有停止後カメラをつける
                        localVideo.srcObject = localStream;
                        room.replaceStream(localStream);
                        localStream.getVideoTracks().forEach((track) => (track.enabled = true));
                        localVideo.playsInline = true;
                        localVideo.play().catch(console.error);

                    }
                }

            }

            //一覧表示(出席確認)
            memberIcon.addEventListener('click', memberBtnClick);
            function memberBtnClick() {
                let members = [];

                if (sessionPositon == '1') {
                    members.push('<div class=attendance><p>' + sessionFamilyName + ' ' + sessionFirstName + '</p><i class="material-icons-outlined icon-size size2" id="face">badge</i></div>');
                }
                else {
                    if (faces.size() === 0) {
                        members.push('<div class=attendance><p>' + sessionFamilyName + ' ' + sessionFirstName + '</p> <i class="material-icons-outlined icon-size size2" id="face" style="color:#c85000">face_retouching_off</i></div>');
                    }
                    else {
                        members.push('<div class=attendance><p>' + sessionFamilyName + ' ' + sessionFirstName + '</p><i class="material-icons-outlined icon-size size2" id="face">face</i></div>');
                    }
                }

                for (i = 0; i < room.members.length; i++) {
                    let member = Number(room.members[i]);
                    // //ID検索
                    let result = usersJsonData.find((u) => u.id === member);
                    if (teacher == room.members[i]) {
                        members.push('<div class=attendance><p>' + result.family_name + ' ' + result.first_name + '</p><i class="material-icons-outlined icon-size size2" id="face">badge</i></div>');
                    }
                    else {
                        if (faceNone.includes(member)) {
                            members.push('<div class=attendance><p>' + result.family_name + ' ' + result.first_name + ' </p><i class="material-icons-outlined icon-size size2" id="face" style="color:#c85000">face_retouching_off</i></div>');
                        }
                        else {
                            members.push('<div class=attendance><p>' + result.family_name + ' ' + result.first_name + '</p> <i class="material-icons-outlined icon-size size2" id="face">face</i></div>');
                        }
                    }

                }
                let text = '<div class=attendance-list>';
                const membersText = members.join('<br>');
                text += membersText;
                text += '</div>';
                swal.fire({
                    title: '出席者一覧',
                    html: text,
                    confirmButtonColor: '#5CA0E8',
                })
            }
            sendFaceDetection();

            //5秒おきに顔取得
            setInterval(sendFaceDetection, 5000);
            function sendFaceDetection() {
                if (sessionPositon == 1) {
                    room.send('skywayhideen9');
                }
                else {
                    if (faces.size() == 0) {
                        room.send('skywayhideen0');
                    }
                    else {
                        room.send('skywayhideen1');
                    }
                }
            }
            //教師がいるか
            function teacherExist() {
                for (i = 0; i < room.members.length; i++) {
                    let member = Number(room.members[i]);
                    if (teacherId == member) {
                        teacherIn();
                    }
                }
            }

            //自分の画像の大きさを大きく
            function teacherLeave() {
                // var myVideoTag = localVideo.cloneNode(true);
                // localVideo.remove();
                // bigScreen[0].appendChild(myVideoTag);
                // smallScreen[0].style.display = 'none';
                // // localStream = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                // // localVideo.srcObject = localStream;
                // localVideo.play();


            }
            //自分び画像の大きさを小さく
            function teacherIn() {
                // smallScreen[0].style.display = 'inline';
                // var myVideoTag = localVideo.cloneNode(true);
                // localVideo.remove();
                // smallScreen[0].appendChild(myVideoTag);
                // // localStream = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                // // localVideo.srcObject = localStream;
                // localVideo.play()


            }



        };

        //peerを受け取ったら作動する
        const receivepeer = peer.on('open', () => {
            joinRoom();

        });

        //リロードした場合再入室
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey) key = true;
            if ((e.which || e.keyCode) == 116) receivepeer;
            if ((e.which || e.keyCode) == 82 && key) receivepeer;

        });

        peer.on('error', console.error);

    })();

});
