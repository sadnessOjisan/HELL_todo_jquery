// memo: - DOMが完全に読み込まれた時にスクリプトが実行されるようにする
$(document).ready(function() {
  // 初期化処理
  $.ajax({
    // memo: - todo全件をfetchする
    type: "GET",
    url: "http://localhost:3000/todos"
  })
    .done(function(data) {
      // memo: - fetch成功時の処理
      // memo: - 取得したtodoたちを1件ずつ画面に描画する
      for (var i = 0; i < data.length; i++) {
        var todo = data[i];
        if (todo.isDone === "true") {
          // memo: - すでに実施したtodoはチェックボックスを入れてある
          $("#todos-area").append(
            '<p class="checked"><input checked type="checkbox" class="todo-check" id=' +
              todo.id +
              " /><span>" +
              todo.task +
              "</span></p>"
          );
        } else {
          $("#todos-area").append(
            '<p class="unchecked"><input type="checkbox" class="todo-check" id=' +
              todo.id +
              " /><span>" +
              todo.task +
              "</span></p>"
          );
        }
      }
      // memo: - checkが付いていないtodoの数を表示する
      $("#remain").text(
        $("#todos-area input:checkbox").length -
          $("#todos-area input:checkbox:checked").length
      );

      // memo: - checkされたときに走る処理を記述. CSSを当てたり、checkされたかの更新をサーバーに送る.
      $(".todo-check").on("click", function(e) {
        var isChecked = $(this).is(":checked");
        var clickedId = $(this).attr("id");
        $("#remain").text(
          $("#todos-area input:checkbox").length -
            $("#todos-area input:checkbox:checked").length
        );
        var todoDom = $("#" + clickedId).parent();
        if (isChecked) {
          todoDom.removeClass("unchecked");
          todoDom.addClass("checked");
        } else {
          todoDom.removeClass("checked");
          todoDom.addClass("unchecked");
        }
        var taskDOM = $("#" + clickedId).next();
        var task = taskDOM.text();
        // memo: - taskの達成をチェックしたら、その結果をサーバーに送る更新機能
        $.ajax({
          type: "PUT",
          url: "http://localhost:3000/todos/" + clickedId,
          data: {
            task: task,
            isDone: isChecked
          }
        });

        // filterがONのときにチェックされたらそれを消す処理
        var filterState = $("#filter-state").text();
        if (filterState === "" || filterState === "on") {
          $("#todos-area input:checkbox:checked")
            .parent()
            .addClass("hide");
        } else {
          $("#todos-area input:checkbox:checked")
            .parent()
            .removeClass("hide");
        }
      });
    })
    .fail(function(data) {
      alert("fail!");
    });

  // memo: - filterの状態を取得. filterのtoggleを宣言
  var filterState = $("#filter-state").text();
  if (filterState === "" || filterState === "on") {
    $("#filter-state").text("off");
    $("#todos-area input:checkbox:checked")
      .parent()
      .addClass("hide");
  } else {
    $("#filter-state").text("on");
    $("#todos-area input:checkbox:checked")
      .parent()
      .removeClass("hide");
  }

  // memo: - formからtodoを登録された時の, todoの追加処理
  $("#submit-form").submit(function(event) {
    event.preventDefault();
    var todo = $("#submit-form [name=todo]").val();
    // memo: - 入力されたtodoをサーバーに送る
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/todos",
      data: {
        task: todo,
        isDone: false
      }
    })
      .done(function(data) {
        // memo: - 入力した値をtaskに追加
        $("#todos-area").append(
          '<p class="unchecked"><input type="checkbox" class="todo-check" id=' +
            data.id +
            " /><span>" +
            data.task +
            "</span></p>"
        );
        $("#remain").text(
          $("#todos-area input:checkbox").length -
            $("#todos-area input:checkbox:checked").length
        );
        // memo: - 新しく追加されたtodoに対するイベントを宣言
        $(".todo-check").on("click", function(e) {
          var isChecked = $(this).is(":checked");
          var clickedId = $(this).attr("id");
          $("#remain").text(
            $("#todos-area input:checkbox").length -
              $("#todos-area input:checkbox:checked").length
          );
          var todoDom = $("#" + clickedId).parent();
          if (isChecked) {
            todoDom.removeClass("unchecked");
            todoDom.addClass("checked");
          } else {
            todoDom.removeClass("checked");
            todoDom.addClass("unchecked");
          }
          // memo: - taskの達成をチェックしたら、その結果をサーバーに送る更新機能
          $.ajax({
            type: "POST",
            url: "http://localhost:3000/todos/" + clickedId,
            data: {
              task: data.task,
              isDone: isChecked
            }
          });
        });
      })
      .fail(function(data) {
        alert("fail!");
      });
  });

  // filter toggle処理
  $("#filter-btn").on("click", function() {
    var filterState = $("#filter-state").text();
    if (filterState === "" || filterState === "on") {
      $("#filter-state").text("off");
      $("#todos-area input:checkbox:checked")
        .parent()
        .removeClass("hide");
    } else {
      $("#filter-state").text("on");
      $("#todos-area input:checkbox:checked")
        .parent()
        .addClass("hide");
    }
  });
});
