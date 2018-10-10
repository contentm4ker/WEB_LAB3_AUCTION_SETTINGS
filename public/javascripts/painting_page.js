let ajaxResp = (data, status) => {
    if (status === 'success') {
        $(document).innerHTML = data;
        location.reload();
    }
}

function removeFromAuction() {
    $.post(`/pics/${$('#pic_id').text()}`,
        {
            inAuct: true
        },
        ajaxResp
    );
}

function addToAuction() {
    $.post(`/pics/${$('#pic_id').text()}`,
        {
            inAuct: false
        },
        ajaxResp
    );
}

function changePicInfo() {
    $('#modal-inp').css('display', 'none');
    $.post(`/pics/${$('#pic_id').text()}`,
        {
            author: $('#inp1').val(),
            picName: $('#inp2').val(),
            startPrice: $('#inp3').val(),
            discription: $('#inp6').val(),
            sMin: $('#inp4').val(),
            sMax: $('#inp5').val()
        },
        ajaxResp
    );
}

