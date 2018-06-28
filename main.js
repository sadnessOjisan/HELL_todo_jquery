$(document).ready(function () {
    $('#submit-form').submit(function (event) {
        event.preventDefault();
        var todo = $('#submit-form [name=todo]').val();
        $.ajax({
                type: "POST",
                url: "https://json-now-ohjoczewvz.now.sh/todos",
                data: {
                    'task': todo,
                }
            })
            .done((data) => {
                alert('success!')
                console.log(data);
            }).fail((data) => {
                alert('fail!')
            });
    });
});