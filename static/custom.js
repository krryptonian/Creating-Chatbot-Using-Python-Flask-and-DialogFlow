$(function () {
    let INDEX = 0;
    $('#chat-submit').click(function (e) {
        e.preventDefault();
        const msg = $('#chat-input').val();
        if (msg.trim() === '') {
            return false;
        }
        generate_message(msg, 'self');
        submit_message(msg);
    });

    function submit_message(message) {
        const sendRequest = $.post('/chat', {message: message});

        sendRequest.done(function (data) {
            console.log(data);
            generate_message(data.message, 'user');
            if (data && data.payload !== null) {
                const buttons = data.payload.suggestion_chips;
                let srtButton = '';
                buttons.map((button) => (
                    srtButton += '<button type="button" class="btn btn-outline-secondary mr-1 btn-chips" onclick="$(\'#chat-input\').val(\'' + button + '\');$(\'#chat-submit\').click();">' + button + '</button>'
                ))
                generate_message(srtButton, 'button')
            }
        });

    }

    function generate_message(msg, type) {
        const chatLogs = $('.chat-logs');
        INDEX++;
        let str = '';
        str += "<div id='cm-msg-" + INDEX + '\' class="chat-msg ' + type + '">';
        if (type !== 'button') {
            str += '<div class="cm-msg-text">';
            str += msg;
            str += '</div>';
        } else {
            str += '<div class="cm-msg-buttons">';
            str += msg;
            str += '</div>';
        }
        str += '</div>';
        chatLogs.append(str);
        $('#cm-msg-' + INDEX).hide().fadeIn(300);
        if (type === 'self') {
            $('#chat-input').val('');
        }
        chatLogs.stop().animate({scrollTop: chatLogs[0].scrollHeight}, 1000);
    }

    $(document).delegate('.chat-btn', 'click', function () {
        const value = $(this).attr('chat-value');
        const name = $(this).html();
        $('#chat-input').attr('disabled', false);
        generate_message(name, 'self');
    });

    $('#chat-circle').click(function () {
        $('#chat-circle').toggle('scale');
        $('.chat-box').toggle('scale');
    });

    $('.chat-box-toggle').click(function () {
        $('#chat-circle').toggle('scale');
        $('.chat-box').toggle('scale');
    });
});
