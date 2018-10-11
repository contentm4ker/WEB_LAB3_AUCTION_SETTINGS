let ajaxResp = (data, status) => {
    if (status === 'success') {
        document.documentElement.innerHTML = data;
    }
};

function deleteMember(ind) {
    $.post(
        '/members/delete',
        {
            id: ind
        },
        ajaxResp
    );
}

function addMember() {
    $.post(
        '/members/put/add',
        {
            name: $('#inp1').val(),
            money: $('#inp2').val()
        },
        ajaxResp
    );
}

function changeMoney() {
    $.post(
        '/members/put/change',
        {
            id: $('#id').text(),
            money: $('#inp3').val()
        },
        ajaxResp
    );
}

function getModalMoneyChanger(name, money, id) {
    $('#modal-change').css('display', 'block');
    $('#name').text(name);
    $('#id').text(id);
    $('#inp3').val(money);
}