$(document).ready(function () {
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
                $('#todos-area').append('<input type="checkbox" class="todo-check unchecked" id=todo_' + data.id + ' /><span>' + data.task + '</span><br />')
                $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
                $('.todo-check').on('click', function(e){
                    var isChecked = $(this).is(':checked')
                    var clickedId = $(this).attr('id')
                    console.log(clickedId)
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

    $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)

    $('.todo-check').on('click', function(e){
        console.log(e)
    })
});