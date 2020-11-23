let print_version_on = false;

function switch_print_version(){
  print_version_on = !print_version_on;

  if (print_version_on){
    // Переключение на версию для печати:
    $('link[href="styles/index.css"]').attr('href', 'styles/print.css');
    $(this).html('Обычная версия');
  }
  else{
    // Переключение на обычную версию:
    $('link[href="styles/print.css"]').attr('href', 'styles/index.css');
    $(this).html('Версия для печати');
  }

  window.scrollTo(0,0);
}

// Выполняется при полной загрузке страницы
$(document).ready( () => {
  $("#print-version-button").on("click", switch_print_version);
})

