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

let posts = [
  {
    id: 1,
    type: post_types.photo,
    title: "Aenean Malesuada Consectetur Risus",
    text: "Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur mollis ornare vel leo.",
    photo_src: "imgs/content-img-1.png",
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 32
  },
  {
    id: 2,
    type: post_types.video,
    title: "Ullamcorper Ipsum Parturient Cursus Etiam",
    text: "Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis Nulla vitae elit libero, a pharetra augue aenean leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
    video_src: "imgs/content-img-3.png",
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
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
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 32
  },
  {
    id: 4,
    type: post_types.photo_album,
    title: "Dolor Purus Aenean Ultricies",
    text: "Cras mattis consectetur purus sit amet fermentum nulla vitae elit.",
    photo_src: "imgs/content-img-2.png",
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 27
  },
  {
    id: 5,
    type: post_types.article,
    title: "Tristique Risus Mattis Ullamcorper",
    text: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis.\n" + "\n" + "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit consectetur.",
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 18
  },
  {
    id: 6,
    type: post_types.quote,
    quote: "Aenean eu leo quam. Pellentesque ornare lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget mollis.",
    author: "John Doe",
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 32
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
    date: new Date(Date.UTC(2020, 11, 23, 19, 35)),
    likes: 29
  },
]

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

  console.log(content_block.clientHeight);

  return content_block;
}

// Загружает посты из массива posts и добавляет их в колонки
function show_all_posts(posts){
  const content_columns = $('.content-column');
  // Конструируем посты для каждого элемента переданного массива
  posts.map(value => {
    let temp_post = construct_post(value);
    if (temp_post != null)
      temp_post.appendTo(content_columns[0]);
  });
  // $('<br>').appendTo($('#older-posts-button'));
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

// Выполняется при полной загрузке страницы
$(document).ready( () => {
  $("#print-version-button").on("click", switch_print_version);

  show_all_posts(posts);
})

