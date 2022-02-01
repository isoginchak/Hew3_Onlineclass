let usersJsonData;
const stringSessionId = ('0000000000000000' + sessionId).slice(-16);

async function ajax() {
    try {
        const res = await axios.get(`/rest`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json_string = JSON.stringify(res.data);
        usersJsonData = JSON.parse(json_string);
        console.log(usersJsonData);
    } catch (e) {
        console.log(e)
    }
}
window.addEventListener('DOMContentLoaded', async function () {
    await ajax();
    onReady();

    const Peer = window.Peer;
    //初期設定 ビデオはオン オーディオオフ
    let videoToggle = 1;
    let audioToggle = 0;
    let roomId = "tmp";

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
        let key = false;
        let localStream;
        let faceNone = [];

        //webカメラ・ビデオの取得
        try {
            //ビデオマイク
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } catch (err) {
            //マイクのみ
            console.log("エラー");
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            videoToggle = -1;
            videoIcon.innerHTML = "videocam_off";
            videoErr.style.display = 'inline';
        }

        // Render local stream
        localVideo.muted = true;
        localVideo.srcObject = localStream;
        localVideo.playsInline = true;
        await localVideo.play().catch(console.error);

        // 自分のpeer作成
        const peer = (window.peer = new Peer(stringSessionId, {
            key: window.__SKYWAY_KEY__,
            debug: 3,
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
                videoIcon.innerHTML = "videocam";


            } else { //ビデオを消す

                localStream.getVideoTracks().forEach((track) => (track.enabled = false));
                videoToggle = 0;
                isStreaming = false;
                videoIcon.innerHTML = "videocam_off";
            }
        }

        //音声のミュート
        audioButton.addEventListener('click', audioBtnClick);

        function audioBtnClick() {
            if (audioToggle == 0) { //音声をつける
                localStream.getAudioTracks().forEach((track) => (track.enabled = true));
                audioToggle = 1;
                volumeIcon.innerHTML = "volume_up";

            } else {//音声を消す
                localStream.getAudioTracks().forEach((track) => (track.enabled = false));
                audioToggle = 0;
                volumeIcon.innerHTML = "volume_off";

            }
        }
        // Register join handler
        function joinRoom() {
            //顔認識起動
            onReady();

            console.log("join");
            // Note that you need to ensure the peer has connected to signaling server
            // before using methods of peer instance.
            if (!peer.open) return;

            //roomの選択
            const room = peer.joinRoom(roomId, {
                mode: 'sfu',
                stream: localStream,
            });

            room.once('open', () => {
                messages.innerHTML += "入室しました<br class='space'>";
            });


            room.on('peerJoin', peerId => {
                const intruder = Number(`${peerId}`);
                //ID検索
                const result = usersJsonData.find((u) => u.id === intruder);
                messages.innerHTML += result.family_name + " " + result.first_name + 'さんが入室<br class="space">';

            });

            // 他のユーザのストリームを受信した時
            room.on('stream', async stream => {
                const newVideo = document.createElement('video');
                newVideo.srcObject = stream;
                newVideo.playsInline = true;
                // mark peerId to find it later at peerLeave event
                newVideo.setAttribute('data-peer-id', stream.peerId);
                remoteVideos.append(newVideo);
                await newVideo.play().catch(console.error);
            });


            //メッセージの受信
            room.on('data', ({
                data,
                src
            }) => {
                if (`${data}` == "skywayhideen0") {
                    //顔が検出されない
                    if (!faceNone.includes(Number(`${src}`))) {
                        faceNone.push(Number(`${src}`));
                    }

                }
                else if (`${data}` == "skywayhideen1") {
                    //顔が検出される
                    faceNone = faceNone.filter(function (x) { return x != Number(`${src}`) });


                }
                else {
                    const now = new Date();
                    const hour = now.getHours();
                    const min = ("0" + now.getMinutes()).slice(-2);
                    const sender = Number(`${src}`);
                    // //ID検索
                    const result = usersJsonData.find((u) => u.id === sender);
                    // 送信されたメッセージと送信者を表示
                    messages.innerHTML += "<span class='sender-box'>" + result.family_name + " " + result.first_name + "</span><br><div class='sender-message-box'>" + `${data}` + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";
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

                messages.innerHTML += result.family_name + " " + result.first_name + 'さんが退出<br  class="space">';

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
                });
            });

            sendTrigger.addEventListener('click', onClickSend);
            leaveTrigger.addEventListener('click', () => room.close(), {
                once: true
            });

            //メッセージの送信
            function onClickSend() {
                //空文字は送信できない
                if (localText.value == "") return;
                const escapeText = escapeHtml(localText.value);

                const now = new Date();
                const hour = now.getHours();
                const min = ("0" + now.getMinutes()).slice(-2);
                // webscketを介してメッセージの送信
                room.send(escapeText);
                messages.innerHTML += "<span class='sender-box'>" + sessionFamilyName + " " + sessionFirstName + "</span><br><div class='my-message-box '>" + escapeText + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";

                localText.value = '';
            }
            //エスケープ処理
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
                if (faces.size() === 0) {
                    members.push('<div class=attendance><p>' + sessionFamilyName + " " + sessionFirstName + '</p> <i class="material-icons-outlined icon-size size2" id="face" style="color:#c85000">face_retouching_off</i></div>');
                }
                else {
                    members.push('<div class=attendance><p>' + sessionFamilyName + " " + sessionFirstName + '</p><i class="material-icons-outlined icon-size size2" id="face">face</i></div>');
                }

                for (i = 0; i < room.members.length; i++) {
                    let member = Number(room.members[i]);
                    // //ID検索
                    let result = usersJsonData.find((u) => u.id === member);
                    if (faceNone.includes(member)) {
                        members.push('<div class=attendance><p>' + result.family_name + " " + result.first_name + ' </p><i class="material-icons-outlined icon-size size2" id="face" style="color:#c85000">face_retouching_off</i></div>');
                    }
                    else {
                        members.push('<div class=attendance><p>' + result.family_name + " " + result.first_name + '</p> <i class="material-icons-outlined icon-size size2" id="face">face</i></div>');
                    }

                }
                let text = '<div class=attendance-list>';
                const membersText = members.join('<br>');
                text += membersText;
                text += '</div>';
                swal.fire({
                    title: "出席者一覧",
                    html: text,
                    confirmButtonColor: '#5CA0E8',
                })
            }

            //30秒おきに顔取得
            setInterval(sendFaceDetection, 30000);
            function sendFaceDetection() {
                if (faces.size() === 0) {
                    room.send("skywayhideen0");
                }
                else {
                    room.send("skywayhideen1");
                }

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

        //人のビデオを押したら拡大 自分のビデオ縮小
        peer.on('error', console.error);

    })();

});
