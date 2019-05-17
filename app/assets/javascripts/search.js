$(function(){

  var search_list = $("#user-search-result")
  var add_list = $("#chat-group-users")

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                </div>`
    search_list.append(html);
  }

  function appendMember(member){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ member.id }'>
                  <p class='chat-group-user__name'>${ member.name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    add_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    
    $.ajax ({
      type: "GET",
      url: '/users',
      data: { members: input },
      DataType: 'json'
    })

    .done(function(users){
      search_list.empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません。");
      }
    })

    .fail(function(users){
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function () {
    var member = {};
    member.id = $(this).attr("data-user-id");
    member.name = $(this).attr("data-user-name");
    $(this).parent().remove();
    appendMember(member);
  });

  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function(){
    $(this).parent().remove();
  });
})
