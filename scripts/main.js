let print_version_on = false;

const path_to_album_back_image = "imgs/album-back.png";
const post_types = {
  article: "article",
  photo: "photo",
  photo_album: "photo_album",
  video: "video",
  music: "music",
  quote: "quote",
  forum: "forum"
}

// Массив данных постов:
let posts = [
  {
    id: 1,
    type: post_types.photo,
    title: "Aenean Malesuada Consectetur Risus",
    text: "Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur mollis ornare vel leo.",
    photo_src: "imgs/content-img-1.png",
    date: new Date(Date.UTC(2020, 10, 1, 19, 35)),
    likes: 132
  },
  {
    id: 2,
    type: post_types.video,
    title: "Ullamcorper Ipsum Parturient Cursus Etiam",
    text: "Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
    video_src: "imgs/content-img-3.png",
    date: new Date(Date.UTC(2020, 10, 8, 19, 35)),
    likes: 47
  },
  {
    id: 3,
    type: post_types.music,
    title: "Vehicula Commodo Vestibulum Sit",
    text: "Pellentesque ornare lacinia quam venenatis vestibulum.",
    music_src: "#",
    music_album_cover: "imgs/album-cover.png",
    music_title: "Beautiful Song",
    music_band: "Awesome Group",
    music_album: "Self-titled",
    date: new Date(Date.UTC(2020, 10, 14, 19, 35)),
    likes: 12
  },
  {
    id: 4,
    type: post_types.photo_album,
    title: "Dolor Purus Aenean Ultricies",
    text: "Cras mattis consectetur purus sit amet fermentum nulla vitae elit.",
    photo_src: "imgs/content-img-2.png",
    date: new Date(Date.UTC(2020, 10, 16, 19, 35)),
    likes: 27
  },
  {
    id: 5,
    type: post_types.article,
    title: "Tristique Risus Mattis Ullamcorper",
    text: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis.\n" + "\n" + "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit consectetur.",
    date: new Date(Date.UTC(2020, 10, 19, 19, 35)),
    likes: 18
  },
  {
    id: 6,
    type: post_types.quote,
    quote: "Aenean eu leo quam. Pellentesque ornare lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget mollis.",
    author: "John Doe",
    date: new Date(Date.UTC(2020, 10, 22, 19, 35)),
    likes: 632
  },
  {
    id: 7,
    type: post_types.forum,
    title: "Two Best Friends",
    text: "<b>Barney</b>: Pellentesque ornare lacinia quam venenatis vestibulum." +
        "<br>" +
        "<b>Ted</b>: Commodo cursus magna, vel scelerisque nisl consectetur et." +
        "<br>" +
        "<b>Barney</b>: Nullam quis risus eget mollis.",
    date: new Date(Date.UTC(2020, 10, 24, 19, 35)),
    likes: 29
  },
]

// Очищает список постов
function clear_posts() {
  let content_blocks = $('.content-block');
  // Если есть хотя бы 1 пост:
  if (content_blocks.length !== 0){
    content_blocks.remove();
  }
}

// Конструирует пост, возвращая jQuery элемент, соответствующий посту
function construct_post(post_data){
  // Если передали пост, у которого нет .type, возвращаем null
  if (post_data.type == null)
    return null;

  // Блок контента:
  let content_block = $("<div/>", {'class' : 'content-block'});
  // Подвал блока:
  let content_footer = $("<div/>", {'class': 'content-footer container flex flex-row'});

  // Заполнение блока в зависимости от типа поста:
  switch (post_data.type) {
    case post_types.article:
      // Пост со стаьёй/текстом:
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-article'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.photo:
      // Пост с фото:
      $("<img/>", {'class': 'content-image', 'src': post_data.photo_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-photo'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.photo_album:
      // Пост с альбомом фото:
      $("<img/>", {'class': 'content-image', 'src': post_data.photo_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-album'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.video:
      // Пост с видео:
      $("<img/>", {'class': 'content-image', 'src': post_data.video_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-video'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.music:
      // Пост с музыкой:
      let music_container = $("<div/>", {'class': 'container flex flex-row music-container'});
      let music_album_container = $("<div/>", {'class': 'container flex flex-row music-album-container'});

      $("<img/>", {'class': 'album-cover', 'src': post_data.music_album_cover}).appendTo(music_album_container);
      $("<img/>", {'class': 'album-back', 'src': path_to_album_back_image}).appendTo(music_album_container);

      music_album_container.appendTo(music_container);

      let music_info = $("<div/>", {'class': 'container flex flex-column music-info'});
      $("<audio/>", {'src': post_data.music_src, 'controls': 'controls'},).appendTo(music_info);
      $("<div/>", {'class': 'content-text music-title icon-music'}).html(post_data.music_title).appendTo(music_info);
      $("<div/>", {'class': 'content-text music-band icon-author'}).html(post_data.music_band).appendTo(music_info);
      $("<div/>", {'class': 'content-text music-album icon-disk'}).html(post_data.music_album).appendTo(music_info);

      music_info.appendTo(music_container);
      music_container.appendTo(content_block);

      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-video'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.quote:
      // Пост со цитатой:
      $("<div/>", {'class': 'content-quote'}).html(post_data.quote).appendTo(content_block);
      $("<div/>", {'class': 'content-author'}).html(post_data.author).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-quote'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.forum:
      // Пост с диалогом/форумом:
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(unescape(post_data.text)).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-forum'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
  }

  $("<div/>", {'class': 'content-likes'}).html(post_data.likes).appendTo(content_footer);

  content_footer.appendTo(content_block);

  return content_block;
}

// Загружает посты из массива posts и добавляет их в колонки
function show_all_posts(posts){
  // Очищаем уже загруженные посты:
  clear_posts();

  const content_container = $('#content-container');
  // Конструируем посты для каждого элемента переданного массива
  posts.map(value => {
    let temp_post = construct_post(value);
    if (temp_post != null)
      temp_post.appendTo(content_container[0]);
  });
}

// Переключает отображение страницы между обычным стилем и стилем для печати
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

// Фильтрует посты по параметрам, установленным в input-ах
function filter_posts(event){
  let clicked_input_name = event.currentTarget.name;

  let selected_post_types_array = [];
  let selected_post_types = {
    article: $("#type-article")[0].checked,
    photo: $("#type-photo")[0].checked,
    photo_album: $("#type-photo_album")[0].checked,
    video: $("#type-video")[0].checked,
    music: $("#type-music")[0].checked,
    quote: $("#type-quote")[0].checked,
    forum: $("#type-forum")[0].checked,
  }

  // Составляем массив строк - типов, которые были выбраны.
  // entries возвращает массив массивов, где value[0] - ключ объекта,
  // value[1] - значение ключа.
  Object.entries(selected_post_types).map(value => {
    if (value[1]){
      selected_post_types_array.push(value[0]);
    }
  })

  // Выбран ли хотя бы один тип постов?
  let any_post_type_selected = selected_post_types_array.length > 0;

  // Выбранное количество лайков:
  let post_likes_checked = $('input[name="post-likes"]:checked');
  let selected_post_likes = post_likes_checked.length !== 0 ? post_likes_checked.val(): null;
  // let selected_post_likes = valueIfExists('input[name="post-likes"]:checked');

  // Выбран ли тип даты размещения поста?
  let any_post_date_selected = true;
  let date_from = null;
  let date_to = null;

  // Выбранный тип даты размещения поста:
  // Если выбран тип "Не позднее":
  let date_sooner = $("#date-sooner");
  let date_from_to = $("#date-from-to");
  if (date_sooner.length !== 0 ? date_sooner[0].checked : false){
    // Насколько старым может быть пост для отображения:
    let num_of_days = $('input[name="post-date-sooner"]:checked').val() || null;
    if (num_of_days == null){
      // Если был выбран тип отбора, но не было выбрано количество дней,
      // считается, что выбор не был сделан.
      any_post_date_selected = false;
    }
    else{
      date_from = new Date(Date.now() - num_of_days * (24*60*60*1000));
    }
  }
  // Если выбран тип "С ... по":
  else if (date_from_to.length !== 0 ? date_from_to[0].checked : false){
    let string_date_from = $('#post-date-from').val(),
        string_date_to = $('#post-date-to').val();
    // Если обе даты не выбраны:
    if (string_date_from === "" && string_date_to === ""){
      any_post_date_selected = false;
    }
    else{
      // Если хотя бы какая-то из дат выбрана:
      if (string_date_from !== ""){
        date_from = new Date(string_date_from);
      }
      if (string_date_to !== ""){
        date_to = new Date(string_date_to);
      }
    }
  }
  // Если не выбран ни один тип:
  else{
    any_post_date_selected = false;
  }

  // Если оказалось, что не выбрана ни одна из настроек фильтра, возвращаем все посты на место:
  if (!(any_post_date_selected || any_post_type_selected || selected_post_likes !== null)){
    show_all_posts(posts);
    // Устанавливаем настройки фильтра постов:
    correct_filter_settings(posts);
  }
  else{
    // Если была выбрана хотя бы одна из настроек фильтра:
    // Создаём массив новых постов:

    let new_posts = posts.filter(post =>{
      if (any_post_type_selected){
        // Если тип поста не был выбран, не добавляем его в массив
        if (!selected_post_types_array.includes(post.type)){
          return false;
        }
      }
      if (selected_post_likes !== null){
        // Если у поста меньше лайков, чем было выбрано
        if (post.likes < selected_post_likes){
          return false;
        }
      }
      if (any_post_date_selected){
        if (date_from !== null){
          if (post.date < date_from){
            return false;
          }
        }
        if (date_to !== null){
          if (post.date > date_to){
            return false;
          }
        }
      }

      // switch (clicked_input_name) {
      //   case "post-type":
      //   if (any_post_type_selected){
      //     // Если тип поста не был выбран, не добавляем его в массив
      //     if (!selected_post_types_array.includes(post.type)){
      //       return false;
      //     }
      //   }
      //     break;
      //   case "post-likes":
      //   if (selected_post_likes !== null){
      //     // Если у поста меньше лайков, чем было выбрано
      //     if (post.likes < selected_post_likes){
      //       return false;
      //     }
      //   }
      //     break;
      //   case "post-date-sooner":
      //   case "post-date-from-to":
      //   if (any_post_date_selected){
      //     if (date_from !== null){
      //       if (post.date < date_from){
      //         return false;
      //       }
      //     }
      //     if (date_to !== null){
      //       if (post.date > date_to){
      //         return false;
      //       }
      //     }
      //   }
      //     break;
      // }
      return true;
    })
//
    let block_types = true,
        block_likes = true,
        block_dates = true;
    switch (clicked_input_name) {
        case "post-type":
        block_types = false;
        break;
      case "post-likes":
        block_likes = false;
        break;
      case "post-date-sooner":
      case "post-date-from-to":
        block_dates = false;
        break;
    }

    correct_filter_settings(new_posts, block_types, block_likes, block_dates);

    new_posts = new_posts.filter(post =>{
      if (any_post_type_selected){
        // Если тип поста не был выбран, не добавляем его в массив
        if (!selected_post_types_array.includes(post.type)){
          return false;
        }
      }
      if (selected_post_likes !== null){
        // Если у поста меньше лайков, чем было выбрано
        if (post.likes < selected_post_likes){
          return false;
        }
      }
      if (any_post_date_selected){
        if (date_from !== null){
          if (post.date < date_from){
            return false;
          }
        }
        if (date_to !== null){
          if (post.date > date_to){
            return false;
          }
        }
      }
      return true;
    })

    show_all_posts(new_posts);

  }

  // event.preventDefault();
}

// Проходится по массиву posts, делая неактивными те настройки фильтров,
// которые будут давать пустые резуьтаты.
// При установки одного из флагов block_... в false соседние флаги
// этого типа не будут блокироваться (полезно при подборе необходимого
// флиьтра при использовании сайта).
function correct_filter_settings(posts,
                                 block_types = true,
                                 block_likes = true,
                                 block_dates = true){
  // Доступные типы постов:
  let avaliable_post_types = {
    article:      false,
    photo:        false,
    photo_album:  false,
    video:        false,
    music:        false,
    quote:        false,
    forum:        false,
  }
  // Минимальное количество лайков на постах:
  let max_likes_avaliable_post = null;
  // Самая поздняя дата поста:
  let latest_avaliable_post = null;

  posts.map( post => {
    // Тип поста:
    avaliable_post_types[post.type] = true;
    // Количество лайков:
    if (max_likes_avaliable_post === null || post.likes > max_likes_avaliable_post){
      max_likes_avaliable_post = post.likes;
    }
    // Дата поста:
    if (latest_avaliable_post === null || post.date > latest_avaliable_post){
      latest_avaliable_post = post.date;
    }
  });

  // Проходимся по всем ключам avaliable_post_types и меняем соответствующие
  // типу поста input-ы.
  // type[0] - название типа (article, photo ...)
  // type[1] - наличие такого типа (true или false)
  for (type of Object.entries(avaliable_post_types)){
    if (!block_types){
      // Если нельзя блокировать типы, то разрешаем только РАЗБЛОКИРОВАТЬ элементы:
      // РАЗБЛОКИРУЕТСЯ, если type[1] = true
      if (type[1]){
        $('#type-'.concat(type[0]))[0].disabled = !type[1];
      }
    }
    else{
      // Если блокировать типы можно, то разрещаем и БЛОКИРОВАТЬ и РАЗБЛОКИРОВАТЬ элементы:
      $('#type-'.concat(type[0]))[0].disabled = !type[1];
    }

    // Если объект БЛОКИРУЕТСЯ, то он автоматически становится не выбранным
    if (!type[1]){
      $('#type-'.concat(type[0]))[0].checked = false;
    }
  }

  if (block_likes){
    for (radio of $('input[name="post-likes"]')){
      radio.disabled = radio.value > max_likes_avaliable_post;
      if (radio.disabled){
        radio.checked = false;
      }
    }
  }
  if (block_dates){
    for (radio of $('input[name="post-date-sooner"]')){
      let radio_date = new Date(Date.now() - parseInt(radio.value) * (24*60*60*1000));
      radio.disabled = radio_date > latest_avaliable_post;
      if (radio.disabled){
        radio.checked = false;
      }
    }
  }

  // console.log('okay');
}

// Выполняется при полной загрузке страницы
$(document).ready( () => {
  $("#print-version-button").on("click", switch_print_version);
  $('input[name="post-date-sooner"]').on("click", () => {$('#date-sooner')[0].checked = true;});

  $('input[name="post-date-from-to"]').on("click", () => {$('#date-from-to')[0].checked = true;});
  $('.filter-settings input').not('input[type="button"]').on("click", filter_posts);

  $("#filter-reset").on("click", (e) => {
    // Устанавливаем настройки фильтра постов:
    correct_filter_settings(posts);
    show_all_posts(posts);
    // Сброс флажков всех input-ов:
    for(inp of $('.filter-settings input')){
      if (inp.checked !== undefined) inp.checked = false;
    }
    e.preventDefault();
  });

  // Устанавливаем настройки фильтра постов:
  correct_filter_settings(posts);
  show_all_posts(posts);
})

