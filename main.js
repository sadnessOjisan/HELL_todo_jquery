$(document).ready(function () {
    // 初期化処理
    $.ajax({
        type: "GET",
        url: "https://json-now-ohjoczewvz.now.sh/todos"
    })
    .done((data) => {
        console.log(data)
        for(var i=0; i<data.length; i++){
            var todo = data[i]
            $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=todo_' + todo.id + ' /><span>' + todo.task + '</span></p>')      
        }
        $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
        $('.todo-check').on('click', function(e){
            var isChecked = $(this).is(':checked')
            var clickedId = $(this).attr('id')
            console.log(clickedId)
            $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
            var todoDom = $("#" + clickedId).parent()
            console.log(todoDom)
            if(isChecked){
                todoDom.removeClass("unchecked")
                todoDom.addClass("checked")
            }else{
                todoDom.removeClass("checked")
                todoDom.addClass("unchecked")
            }
        })
    }).fail((data) => {
        alert('fail!')
    });

    // todo 追加処理
    $('#submit-form').submit(function (event) {
        event.preventDefault();
        var todo = $('#submit-form [name=todo]').val();
        $.ajax({
                type: "POST",
                url: "https://json-now-ohjoczewvz.now.sh/todos",
                data: {
                    'task': todo,
                    isDone: false
                }
            })
            .done((data) => {
                $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=todo_' + data.id + ' /><span>' + data.task + '</span></p>')
                $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
                $('.todo-check').on('click', function(e){
                    var isChecked = $(this).is(':checked')
                    var clickedId = $(this).attr('id')
                    $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
                    var todoDom = $("#" + clickedId).parent()
                    if(isChecked){
                        todoDom.removeClass("unchecked")
                        todoDom.addClass("checked")
                    }else{
                        todoDom.removeClass("checked")
                        todoDom.addClass("unchecked")
                    }
                })
            }).fail((data) => {
                alert('fail!')
            });
    });

    // filter toggle処理
    $('#filter-btn').on('click', function(){
        var filterState = $('#filter-state').text()
        if(filterState === '' || filterState === 'on'){
            $('#filter-state').text('off')
            $('#todos-area input:checkbox:checked').parent().addClass('hide')
        }else{
            $('#filter-state').text('on')
            $('#todos-area input:checkbox:checked').parent().removeClass('hide')
        }
    })
});