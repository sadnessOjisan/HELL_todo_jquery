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
                $('#todos-area').append('<input type="checkbox" class="todo-check" /><span>' + data.task + '</span><br />')
                $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
                $('.todo-check').on('click', function(e){
                    var isChecked = $(this).is(':checked')
                    $('#remain').text($('#todos-area input:checkbox').length-$('#todos-area input:checkbox:checked').length)
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