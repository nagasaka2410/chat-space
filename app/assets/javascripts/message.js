$(function(){
  function buildHTML(message){

    message.image? image = '<img class="lower-message__image" src=${message.image}>' : image = "";

    var html = `<div class="message">
                  <div class='section'>
                    <div class='section__user-name'>
                    ${message.name}
                    </div>
                    <div class='section__date'>
                    ${message.date}
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
})
