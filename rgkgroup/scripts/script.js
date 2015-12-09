/**
 * Created by 1 on 01.12.2015.
 */
$(document).on('ready', function () {

    $(chbRules).on('change', function () {
        if (!this.checked) {
            $('.btn-watch').attr('disabled', 'disabled');
        } else {
            $('.btn-watch').removeAttr('disabled');
        }
    });
});