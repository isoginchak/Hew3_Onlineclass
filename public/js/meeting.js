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
        let members = [];
        let localStream;

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
            if (videoToggle == -1) {
                return;
            }
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
            if (!peer.open) {
                return;
            }
            //roomの選択
            const room = peer.joinRoom(roomId, {
                mode: 'sfu',
                stream: localStream,
            });

            room.once('open', () => {
                messages.innerHTML += "入室しました<br class='space'>";
                members.push(`${peer.id}`);
            });
            room.on('peerJoin', peerId => {
                const intruder = Number(`${peerId}`);
                //ID検索
                const result = usersJsonData.find((u) => u.id === intruder);

                messages.innerHTML += result.family_name+" "+result.first_name +'さんが入室<br class="space">';

                //配列に格納
                members.push(`${peerId}`);


            });

            // Render remote stream for new peer join in the room
            room.on('stream', async stream => {
                const newVideo = document.createElement('video');
                newVideo.srcObject = stream;
                newVideo.playsInline = true;
                // mark peerId to find it later at peerLeave event
                newVideo.setAttribute('data-peer-id', stream.peerId);
                remoteVideos.append(newVideo);
                await newVideo.play().catch(console.error);
            });

            room.on('data', ({
                data,
                src
            }) => {
                const now = new Date();
                const hour = now.getHours();
                const min = ("0" + now.getMinutes()).slice(-2);
                const sender = Number(`${src}`);
                // //ID検索
                const result = usersJsonData.find((u) => u.id === sender);
                // 送信されたメッセージと送信者を表示
                messages.innerHTML += "<span class='sender-box'>" + result.family_name + " " + result.first_name + "</span><br><div class='sender-message-box'>" + `${data}` + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";
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

                messages.innerHTML +=result.family_name+" "+result.first_name +'さんが退出<br  class="space">';
                //配列から削除
                for (i = 0; i < members.length; i++) {
                    if (members[i] == `${peerId}`) {
                        //spliceメソッドで要素を削除
                        members.splice(i, 1);
                    }
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
                });
            });

            sendTrigger.addEventListener('click', onClickSend);
            leaveTrigger.addEventListener('click', () => room.close(), {
                once: true
            });

            //メッセージの送信
            function onClickSend() {
                //空文字は送信できない
                if (localText.value == "") {
                    return;
                }
                const now = new Date();
                const hour = now.getHours();
                const min = ("0" + now.getMinutes()).slice(-2);
                // webscketを介してメッセージの送信
                room.send(localText.value);
                messages.innerHTML += "<span class='sender-box'>" + sessionFamilyName + " " + sessionFirstName + "</span><br><div class='my-message-box '>" + `${localText.value}` + "</div><br><div class='message-time'>" + `${hour}` + ":" + `${min}` + "</div>";
                localText.value = '';
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
                console.log(members);
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
