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
        $.post('/chat', {message: message}, handle_response);

        function handle_response(data) {
            console.log(data);
            // append the bot repsonse to the div
            generate_message(data.message, 'user');
        }
    }

    function generate_message(msg, type) {
        INDEX++;
        let str = '';
        str += "<div id='cm-msg-" + INDEX + '\' class="chat-msg ' + type + '">';
        // str += '<span class="msg-avatar">';
        // str += '<img src="/static/images/01.jpg" alt="Profile photo">';
        // str += '</span>';
        str += '<div class="cm-msg-text">';
        str += msg;
        str += '</div>';
        str += '</div>';
        $('.chat-logs').append(str);
        $('#cm-msg-' + INDEX).hide().fadeIn(300);
        if (type === 'self') {
            $('#chat-input').val('');
        }
        $('.chat-logs').stop().animate({scrollTop: $('.chat-logs')[0].scrollHeight}, 1000);
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
