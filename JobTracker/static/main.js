function toggleDiv(divId) {
    $('#' + divId).fadeToggle(150);
}

function refreshPage() {
    $('#pageContent').load(location.href + ' #pageContent');
    $('#navContent').load(location.href + ' #navContent');
}

function jobappCreate() {
    $('#spinner').show();
    $.post('jobapp_create', {
        url: $('#url').val(),
        employer: $('#employer').val()
    }, function(data) {
        refreshPage();
    })
}

function jobappEdit(jobappId) {
    $('#spinner').show();
    $.post('jobapp_edit', {
        id_: jobappId,
        url: $('#url' + jobappId).val(),
        employer: $('#employer' + jobappId).val(),
        status: $('#status' + jobappId).val()
    }, function(data) {
        refreshPage();
    })
}

function jobappDelete(jobappId) {
    $('#spinner').show();
    $.get('jobapp_delete', {
        id_: jobappId
    }, function(data) {
        refreshPage();
    })
}