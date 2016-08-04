class message {

  constructor () {
  }

  showErro (msgError) {
    swal({
      title: 'Erro Interno',
      text: msgError,
      type: 'error',
    });
  };

  showSuccess (title, msgSuccess) {
    swal(title, msgSuccess, 'success');
  };

  showConfirmation (title, msg, comando, callback) {

    swal({
      title: title,
      text: msg,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: comando,
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then(function () {

      callback(null, true);

    }, function (dismiss) {
      callback(null, false);
    })

  }

  /**
   * Testando a documentação
   * @param msg
   */
  showSuccessNotification (msg) {
    Bert.alert(msg, 'success', 'fixed-top', 'fa-check');
  };

  /**
   * Teste 2
   * @param msg
   */
  showInfoNotification (msg) {
    Bert.alert(msg, 'info', 'fixed-top', 'fa-info');
  };

  showWarningNotification (msg) {
    Bert.alert(msg, 'warning', 'fixed-top', 'fa-warning');
  };

  showErrorNotification (msg) {
    Bert.alert(msg, 'danger', 'fixed-top', 'fa-remove');
  };
}

export const Message = new message();


