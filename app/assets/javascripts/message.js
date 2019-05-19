$(function(){
  function buildHTML(message){
    var image = message.image.url ? `<img class="lower-message__image" src=${message.image}>` : "";
    var html = `<div class="message" data-id= "${ message.id }">
                  <div class='section'>
                    <div class='section__user-name'>
                    ${message.user_name}
                    </div>
                    <div class='section__date'>
                    ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-meesage'>
                    <p class='lower-message__content'>
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".form__message").val('');
      $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('メッセージを送信できません');
    })
    return false;
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    var test_url = window.location.href.replace(/messages/,"");
    var url = test_url + "api/messages";
    if(url.match(/\/groups\/\d+\/api\/messages/)){
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach(function(message){
          var insertHTML = buildHTML(message);
          $(".messages").append(insertHTML);
        })
        $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval();
    }
  };
  setInterval(reloadMessages, 5000);
})
