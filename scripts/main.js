let print_version_on = false;

const path_to_album_back_image = "imgs/album-back.png";
// Типы постов:
const post_types = {
  article:     {value: 'article', name: "Статья"},
  photo:       {value: 'photo', name: "Фото"},
  photo_album: {value: 'photo_album', name: "Фотоальбом"},
  video:       {value: 'video', name: "Видео"},
  music:       {value: 'music', name: "Музыка"},
  quote:       {value: 'quote', name: "Цитата"},
  forum:       {value: 'forum', name: "Обсуждение"},
}
// Типы сравнений (для использования в filtersTypes.range):
const compareTypes = {
  greater:      (value, filter) => value > filter,    // Больше
  greaterEqual: (value, filter) => value >= filter,   // Больше, либо равно
  smaller:      (value, filter) => value < filter,    // Меньше
  smallerEqual: (value, filter) => value <= filter,   // Меньше, либо равно
  equal:        (value, filter) => value === filter,  // Равно
  notEqual:     (value, filter) => value !== filter,  // Не равно
}
// Типы input-ов (для использования в filtersTypes.userInputRange):
const inputTypes = {
  text: 'text',     // Простое текстовое поле
  date: 'date',     // Выбор даты
}
// Типы фильтров:
const filtersTypes = {
  // Любой фильтр должен обладать следующими полями:
  // name - Название фильтра (используется при генерации элементов)
  // title - Человеко-читаемое название фильтра
  // filterType - Тип фильтра (один из перечисленных в filtersTypes)

  // Тип фильтра, который подгружает все возможные значения определённого атрибута объекта
  // и создаёт группу checkbox-ов с их перечислением.
  // Данный фильтр использует поля:
  // attribute - Атрибут объекта, который испольуется для фильтрации
  // attributeNames - Объект, который имеет поля с человеко-читаемыми названиями атрибутов
  attributeList: 'attributeList',
  // TODO: придумать нормальное описание данного фильтра:
  // Тип фильтра, который определяет группу checkbox-ов с предустановленными значениями,
  // типа: 10+, 20+ и т.д.
  // Данный фильтр использует поля:
  // attribute - Атрибут объекта, который испольуется для фильтрации
  // compareType - Способ сравнения атрибута объекта с значениями в ranges
  //  Выбирается из атрибутов объекта compareTypes.
  // ranges - Массив значений, с которыми будет сравниваться значение определённого артрибута объекта
  // rangesNames - (необязательно) Человеко-читаемое название каждого элемента ranges
  range: 'range',
  // Тип фильтра, который использует text или dateTime input для сравнения определённого атрибута.
  // Данный фильтр использует поля:
  // inputType - Вид input-ов, используемых для сравнения определённого атрибута
  //  Выбирается из атрибутов объекта userInputs
  userInputRange: 'userInputRange',
}

// Массив данных постов:
let posts = [
  {
    id: 1,
    type: post_types.photo.value,
    title: "Aenean Malesuada Consectetur Risus",
    text: "Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur mollis ornare vel leo.",
    photo_src: "imgs/content-img-1.png",
    date: new Date(Date.UTC(2020, 10, 1, 19, 35)),
    likes: 132
  },
  {
    id: 2,
    type: post_types.video.value,
    title: "Ullamcorper Ipsum Parturient Cursus Etiam",
    text: "Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
    video_src: "imgs/content-img-3.png",
    date: new Date(Date.UTC(2020, 10, 8, 19, 35)),
    likes: 47
  },
  {
    id: 3,
    type: post_types.music.value,
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
    type: post_types.photo_album.value,
    title: "Dolor Purus Aenean Ultricies",
    text: "Cras mattis consectetur purus sit amet fermentum nulla vitae elit.",
    photo_src: "imgs/content-img-2.png",
    date: new Date(Date.UTC(2020, 10, 16, 19, 35)),
    likes: 27
  },
  {
    id: 5,
    type: post_types.article.value,
    title: "Tristique Risus Mattis Ullamcorper",
    text: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis.\n" + "\n" + "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit consectetur.",
    date: new Date(Date.UTC(2020, 10, 19, 19, 35)),
    likes: 18
  },
  {
    id: 6,
    type: post_types.quote.value,
    quote: "Aenean eu leo quam. Pellentesque ornare lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget mollis.",
    author: "John Doe",
    date: new Date(Date.UTC(2020, 10, 22, 19, 35)),
    likes: 632
  },
  {
    id: 7,
    type: post_types.forum.value,
    title: "Two Best Friends",
    text: "<b>Barney</b>: Pellentesque ornare lacinia quam venenatis vestibulum." +
        "<br>" +
        "<b>Ted</b>: Commodo cursus magna, vel scelerisque nisl consectetur et." +
        "<br>" +
        "<b>Barney</b>: Nullam quis risus eget mollis.",
    date: new Date(Date.UTC(2020, 10, 24, 19, 35)),
    likes: 29
  },
];
// Массив фильтров
let filters = [
  {
    // Фильтр по типу постов:
    name: 'post-type',                          // Название фильтра (используется при генерации элементов)
    title: 'Тип поста',                         // Человеко-читаемое название фильтра
    filterType: filtersTypes.attributeList,     // Тип фильтра (один из перечисленных в filtersTypes)
    attribute: 'type',                          // Атрибут объекта, который испольуется для фильтрации
    attributeNames: post_types,                 // Объект, который имеет поля с человеко-читаемыми названиями атрибутов
  },
  {
    // Фильтр по количеству "лайков":
    name: 'post-likes',                         // Название фильтра (используется при генерации элементов)
    title: 'Количество лайков',                 // Человеко-читаемое название фильтра
    filterType: filtersTypes.range,             // Тип фильтра (один из перечисленных в filtersTypes)
    // Количество лайков "от 10 и выше":
    compareType: compareTypes.greaterEqual,     // Способ сравнения атрибута объекта с значениями в ranges
    attribute: 'likes',                         // Атрибут объекта, который испольуется для фильтрации
    ranges: [0, 10, 50, 100, 250],              // Массив значений, с которыми будет сравниваться значение определённого артрибута объекта
    rangesNames: ["Любое", "10+", "50+", "100+", "250+"], // Человеко-читаемое название каждого элемента ranges
  },
  {
    // Фильтр по дате создания поста:
    name: 'post-date',                          // Название фильтра (используется при генерации элементов)
    title: 'Вышедший не позднее',               // Человеко-читаемое название фильтра
    filterType: filtersTypes.range,             // Тип фильтра (один из перечисленных в filtersTypes)
    // Дата создания от определённой даты и позднее:
    compareType: compareTypes.greaterEqual,     // Способ сравнения атрибута объекта с значениями в ranges
    attribute: 'date',                          // Атрибут объекта, который испольуется для фильтрации
    // Количество времени в днях:
    ranges: [3, 7, 14, 31].map(value => new Date(Date.now() - value * (24*60*60*1000))), // Массив значений, с которыми будет сравниваться значение определённого артрибута объекта
    rangesNames: ["Трёх дней", "Недели", "Двух недель", "Месяца"], // Человеко-читаемое название каждого элемента ranges
  },
  {
    // Фильтр по дате создания поста с выбором границ даты:
    name: 'post-select-date',                   // Название фильтра (используется при генерации элементов)
    title: 'Вышедший за период',                // Человеко-читаемое название фильтра
    filterType: filtersTypes.userInputRange,    // Тип фильтра (один из перечисленных в filtersTypes)
    inputType: inputTypes.date,                 // Вид input-ов, используемых для сравнения определённого атрибута
    attribute: 'date',                          // Атрибут объекта, который испольуется для фильтрации
    inputs: [                                   // Массив объектов, описывающих input-ы и необходимые функции для сравнения
      {
        label: 'С',                             // Содержимое label у соответствующего input-а
        compareType: compareTypes.greaterEqual, // Тип сравнения с данным input-ом
      },
      {
        label: 'По',                            // Содержимое label у соответствующего input-а
        compareType: compareTypes.smallerEqual, // Тип сравнения с данным input-ом
      },
    ],
  },
];

// Массив выбранных в данный момент фильтров
// При создании групп фильтров сюда добавляется объект.
// При изменении состояния checkbox-а меняется состояние
let selectedFilters = [
];

// Проверяет наличие необходимых полей у объекта (данных о фильтре):
// Возвращает true, если все поля присутствуют.
// noinspection JSUnusedLocalSymbols
function checkFilterData(filterData){
  // TODO: при необходимости.
  return true;
}

// Конструирует фильтр, возварщаея jQuery элемент, соответствующий фильтру
function constructFilter(filterData, posts){
  if (!checkFilterData(filterData))
    return null;
  // fieldset фильтра:
  let filterFieldset = $("<fieldset/>", {'class': filterData.name});
  // legend fieldset-а:
  $("<legend/>").html(filterData.title).appendTo(filterFieldset);

  // Конструируем фильтр исходя из типа фильтра:
  switch (filterData.filterType) {
    case "attributeList":
      // Выбор одного из возможных значений атрибута
        // Список уникальных значений данного атрибута:
        const possibleTypes = new Set(posts.map(post => {
          return post[filterData.attribute];
        }));
        possibleTypes.forEach(type => {
          const inputId = filterData.name.concat("-").concat(type);
          let span = $("<span/>");
          $("<input/>",
              {'name': filterData.name,
                'id': inputId,
                'type': 'checkbox',
                'value': type,
              })
              .on("click", () => {
                switchFilter(filterData.name, type);
              })
              .appendTo(span);
          $("<label/>",{'for': inputId})
              .html(filterData.attributeNames[type].name).appendTo(span);
          span.appendTo(filterFieldset);
        });
        // TODO: привязать события к нажатиям checkbox-ов
      break;
    case "range":
      filterData.ranges.map((value, index) =>{
        const inputId = filterData.name.concat("-").concat(value);
        let span = $("<span/>");
        $("<input/>",
            {'name': filterData.name,
              'id': inputId,
              'type': 'checkbox',
              'value': value,
            })
            .on("click", () => {
              switchFilter(filterData.name, value);
            })
            .appendTo(span);
        $("<label/>",{'for': inputId})
            .html(filterData.rangesNames[index]).appendTo(span);
        span.appendTo(filterFieldset);
      });
      break;
    case "userInputRange":
      return null;
      break;
    default:
      return null;
  }

  selectedFilters.push({
    name: filterData.name,
    filter: filterData,
    selected: new Set(),
  });

  return filterFieldset;
}

// Загружает все фильтры, конструируя их и добавляя в соответсвующую форму
function loadAllFilters(filters, posts){
  const fieldset_with_buttons = $('#fieldset-with-buttons');

  filters.map(filterData => {
    let tempFilter = constructFilter(filterData, posts);
    if (tempFilter != null)
      tempFilter.appendTo(fieldset_with_buttons);
  })
}

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
    case post_types.article.value:
      // Пост со стаьёй/текстом:
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-article'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.photo.value:
      // Пост с фото:
      $("<img/>", {'class': 'content-image', 'src': post_data.photo_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-photo'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.photo_album.value:
      // Пост с альбомом фото:
      $("<img/>", {'class': 'content-image', 'src': post_data.photo_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-album'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.video.value:
      // Пост с видео:
      $("<img/>", {'class': 'content-image', 'src': post_data.video_src}).appendTo(content_block);
      $("<div/>", {'class': 'content-title'}).html(post_data.title).appendTo(content_block);
      $("<div/>", {'class': 'content-text'}).html(post_data.text).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-video'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.music.value:
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
    case post_types.quote.value:
      // Пост со цитатой:
      $("<div/>", {'class': 'content-quote'}).html(post_data.quote).appendTo(content_block);
      $("<div/>", {'class': 'content-author'}).html(post_data.author).appendTo(content_block);
      $("<div/>", {'class': 'content-date icon-quote'}).html(post_data.date.toLocaleString("ru-RU", {day: 'numeric', month: 'short', year: 'numeric'})).appendTo(content_footer);
      break;
    case post_types.forum.value:
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

// Добавляет или удаляет значение value элемента в соответствующий массив selectedFilters
function switchFilter(filterName, filterValue) {
  const setToLook = selectedFilters.find(value => value.name === filterName).selected;
  if (setToLook.has(filterValue)){
    setToLook.delete(filterValue);
  }
  else{
    setToLook.add(filterValue);
  }

  filter(posts, selectedFilters);
}

// Фильтрует посты по параметрам selectedFilters
function filter(posts, selectedFilters){
  // Копируем список постов:
  let newPosts = [...posts];
  // Для каждого фильтра...
  selectedFilters.map(filter => {
    // Исходя из типа фильтра делаем по-своему:
    switch (filter.filter.filterType){
      case "attributeList":
        // Для выбора из списка атрибутов фильтруем newPosts на вхожение post.type (в общем случае - post[filter.filter.attribute]) в массив (Set) selected.
        // Если такой тип там есть, оставляем пост, иначе - удаляем из выборки.
        if (filter.selected.size === 0)
          break;
        newPosts = newPosts.filter(post => {
          return filter.selected.has(post[filter.filter.attribute]);
        });
        break;
      case "range":
        // Для выбора из диапазона, сперва находим min/max или equal значение, а затем фильтруем как выше.
        if (filter.selected.size === 0)
          break;
        switch (filter.filter.compareType) {
          case compareTypes.greater:
          case compareTypes.greaterEqual:
            // Находим наименьший элемент
            let min = filter.selected.values().next().value;
            filter.selected.forEach(value => {if (value < min) min = value;});
            newPosts = newPosts.filter(post => {
              return filter.filter.compareType(post[filter.filter.attribute], min);
            });
            break;
          case compareTypes.smaller:
          case compareTypes.smallerEqual:
            // Находим наибольший элемент
            let max = filter.selected.values().next().value;
            filter.selected.forEach(value => {if (value > max) max = value;});
            newPosts = newPosts.filter(post => {
              return filter.filter.compareType(post[filter.filter.attribute], max);
            });
            break;
          case compareTypes.equal:
          case compareTypes.notEqual:
            // TODO: реализовать при необходимости
            break;
        }
        break;
      case "userInputRange":
        // TODO
        break;
    }
  });
  show_all_posts(newPosts);
}
/*
function filter_posts(event){
  let clicked_input_name = event.currentTarget.name;

  let selected_post_types_array = [];
  let selected_post_types = {
    article: $("#type-article")[0].checked         , //&& !$("#type-article")[0].disabled,
    photo: $("#type-photo")[0].checked             , //&& !$("#type-photo")[0].disabled,
    photo_album: $("#type-photo_album")[0].checked , //&& !$("#type-photo_album")[0].disabled,
    video: $("#type-video")[0].checked             , //&& !$("#type-video")[0].disabled,
    music: $("#type-music")[0].checked             , //&& !$("#type-music")[0].disabled,
    quote: $("#type-quote")[0].checked             , //&& !$("#type-quote")[0].disabled,
    forum: $("#type-forum")[0].checked             , //&& !$("#type-forum")[0].disabled,
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
    // Создаём массив новых постов, фильтруя исходный массив:
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
      return true;
    })

    // Определяем, нужно ли блокировать изменение каких-либо элементов фильтра
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

    // Сперва корректируем настройки фильтров:
    correct_filter_settings(new_posts, block_types, block_likes, block_dates);

    // Затем показываем оставшиеся посты
    show_all_posts(new_posts);

  }

  // event.preventDefault();
}
*/

// Проходится по массиву posts, делая неактивными те настройки фильтров,
// которые будут давать пустые резуьтаты.
// При установки одного из флагов block_... в false соседние флаги
// этого типа не будут блокироваться (полезно при подборе необходимого
// флиьтра при использовании сайта).
/*
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
  }
  if (block_likes){
    for (radio of $('input[name="post-likes"]')){
      radio.disabled = radio.value > max_likes_avaliable_post;
    }
  }
  if (block_dates){
    for (radio of $('input[name="post-date-sooner"]')){
      let radio_date = new Date(Date.now() - parseInt(radio.value) * (24*60*60*1000));
      radio.disabled = radio_date > latest_avaliable_post;
    }
  }

  // console.log('okay');
}

*/
// Выполняется при полной загрузке страницы
$(document).ready( () => {
  $("#print-version-button").on("click", switch_print_version);
  /*
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

  $("#filter-hide").on("click", (e) => {
    $("#fieldset-with-buttons fieldset").toggleClass("fieldset-hidden");
    e.preventDefault();
  })

  // Устанавливаем настройки фильтра постов:
  correct_filter_settings(posts);
  */
  show_all_posts(posts);

  loadAllFilters(filters, posts);
})

