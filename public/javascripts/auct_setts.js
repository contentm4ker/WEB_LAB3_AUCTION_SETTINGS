function setSlider(slider, output) {
    slider.change(function() {output.text(this.value);});
}

setSlider($("#timeout"), $("#timeout-output"));
setSlider($("#allTime"), $("#allTime-output"));
setSlider($("#researchPause"), $("#researchPause-output"));

let ajaxResp = (data, status) => {
    if (status === 'success') {
        alert("Информация успешно обновлена!");
    }
};

function saveChanges() {
    $.post(
        '/settings',
        {
            DateTime: $("#DateTime").val(),
            timeout: $("#timeout").val(),
            allTime: $("#allTime").val(),
            researchPause: $("#researchPause").val()
        },
        ajaxResp
    );
}