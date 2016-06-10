class message {

    constructor() {
    }

    showErro(msgError) {
        swal({
            title: "Erro Interno",
            text: msgError,
            type: "error",
            closeOnConfirm: true
        });
    };

    showSuccess(title, msgSuccess) {
        swal(title, msgSuccess, "success");
    };

    showConfirmation(title, msg, comando, callback) {
        swal({
                title: title,
                text: msg,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: comando,
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    callback(null,true);
                } else {
                    callback(null,false);
                }
            });
    }

    showSuccessNotification(msg) {
        Bert.alert(msg, 'success', 'fixed-top', 'fa-check');
    };

    showInfoNotification(msg) {
        Bert.alert(msg, 'info', 'fixed-top', 'fa-info');
    };

    showWarningNotification(msg) {
        Bert.alert(msg, 'warning', 'fixed-top', 'fa-warning');
    };

    showErrorNotification(msg) {
        Bert.alert(msg, 'danger', 'fixed-top', 'fa-remove');
    };
}

export const Message = new message();


