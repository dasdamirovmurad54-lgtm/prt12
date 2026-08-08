const ANILIST_URL = 'https://graphql.anilist.co';
// AniLibria.tv была переименована в AniLiberty вместе с полным переходом на
// новый бэкенд — старый api.anilibria.tv/v3 (и легаси public/api/index.php)
// официально deprecated и по факту не отвечает. Актуальный API — api.anilibria.app
// (он же зеркалится на anilibria.top / aniliberty.top), но публичной схемы
// ответа у него нет, поэтому парсинг ниже сделан defensively: пробует
// несколько вероятных вариантов названия полей вместо одного жёстко заданного.
// Запросы всё ещё идут через публичный CORS-прокси allorigins.win, так как
// неизвестно, отдаёт ли новый API заголовок Access-Control-Allow-Origin.
const ANILIBRIA_API = 'https://api.anilibria.app/api/v1';
const ANILIBRIA_ORIGIN = 'https://anilibria.top';
const ANILIBRIA_CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const PER_PAGE = 24;
const FAV_KEY = 'animeroom_favorites';
const USER_KEY = 'animeroom_user';
const THEME_KEY = 'animeroom_theme';
const LANG_KEY = 'animeroom_lang';
const USERS_KEY = 'animeroom_users';
const TIME_KEY = 'animeroom_time';
const BADGES_KEY = 'animeroom_badges';
const TITLE_KEY = 'animeroom_title';
const STATS_KEY = 'animeroom_stats';
const WATCHED_KEY = 'animeroom_watched';
const WATCHED_LIMIT = 60;
const AVATAR_KEY = 'animeroom_avatar';
const COMMENTS_KEY = 'animeroom_comments';

// ——— XP / уровень (по времени на сайте) ———
// Порог 1 ур. — 10ч, дальше каждые +5ч новый уровень (15, 20, 25...)
const XP_START_HOURS = 10;
const XP_STEP_HOURS = 5;


const POPULAR_STUDIOS = [
  'Kyoto Animation', 'MAPPA', 'ufotable', 'Bones', 'Madhouse',
  'Studio Ghibli', 'Production I.G', 'Wit Studio', 'A-1 Pictures',
  'Toei Animation', 'Sunrise', 'CloverWorks', 'Trigger', 'Shaft',
  'J.C.Staff', 'P.A. Works', 'White Fox', 'David Production',
  'TMS Entertainment', 'Studio Pierrot', 'Gainax', 'CoMix Wave Films'
];

// ——— i18n ———
const i18n = {
  ru: {
    searchPlaceholder: 'Поиск аниме...',
    navTop: 'Топ',
    navAiring: 'Онгоинг',
    navUpcoming: 'Анонсы',
    navMovie: 'Фильмы',
    navFavorites: 'Избранное',
    login: 'Войти',
    register: 'Регистрация',
    nickname: 'Ник',
    password: 'Пароль',
    genre: 'Жанр',
    allGenres: 'Все жанры',
    season: 'Сезон',
    any: 'Любой',
    winter: 'Зима',
    spring: 'Весна',
    summer: 'Лето',
    fall: 'Осень',
    year: 'Год',
    studio: 'Студия',
    sort: 'Сортировка',
    sortScore: 'По рейтингу',
    sortPopularity: 'По популярности',
    sortTrending: 'В тренде',
    sortNew: 'Новинки',
    sortTitle: 'По названию',
    apply: 'Применить',
    reset: 'Сбросить',
    loading: 'Загрузка...',
    prev: '← Назад',
    next: 'Вперёд →',
    page: 'Страница',
    of: 'из',
    settings: 'Настройки',
    profile: 'Профиль',
    show: 'Показать',
    hide: 'Скрыть',
    logout: 'Выйти',
    timeOnSite: 'Время на сайте',
    title: 'Титул',
    noTitle: 'ты не достоин',
    noBadgesYet: 'Пока нет доступных титулов',
    clearTitle: 'Сбросить титул',
    hoursShort: 'ч',
    libraryTab: 'Коллекция',
    watchedTitle: 'Просмотренные',
    emptyWatched: 'Пока ничего не просмотрено.<br>Открой карточку аниме, чтобы она попала сюда.',
    level: 'Уровень',
    changeAvatar: 'Изменить аватар',
    watchOnYoutube: 'YouTube',
    watchOnVk: 'VK',
    openVk: 'Открыть поиск на VK Видео →',
    watchOnAnilibria: 'AniLibria',
    anilibriaSearching: 'Ищем на AniLibria...',
    anilibriaNotFound: 'На AniLibria ничего не найдено',
    anilibriaChoose: 'Похожие тайтлы на AniLibria — выберите нужный:',
    anilibriaEpisodes: 'Серии',
    anilibriaNoEpisodes: 'Серии ещё не залиты в плеер',
    anilibriaBlocked: '⚠ Тайтл может быть заблокирован на территории РФ',
    anilibriaError: 'Не удалось загрузить данные с AniLibria',
    anilibriaBack: '← Другой тайтл',
    badges: 'Бейджи',
    badgeUnlocked: 'Новый бейдж!',
    themeColor: 'Цвет темы',
    themeHint: 'Текст всегда белый. Колесо меняет цвет фона за постерами.',
    pattern: 'Узор фона',
    patternSolid: 'Сплошной',
    patternGradient: 'Градиент',
    patternLeopard: 'Леопард',
    patternZebra: 'Зебра',
    patternDots: 'Точки',
    patternWaves: 'Волны',
    language: 'Язык',
    footer: 'Данные AniList. Избранное хранится локально в браузере.',
    topTitle: 'Топ аниме',
    topSub: 'Лучшие тайтлы по рейтингу AniList',
    airingTitle: 'Онгоинг',
    airingSub: 'Аниме, которые сейчас выходят',
    upcomingTitle: 'Анонсы',
    upcomingSub: 'Скоро выйдут',
    movieTitle: 'Аниме-фильмы',
    movieSub: 'Полнометражные картины',
    favTitle: 'Избранное',
    favSub: 'Твои сохранённые тайтлы',
    searchResults: 'Результаты поиска',
    searchSub: 'По запросу',
    nothingFound: 'Ничего не найдено',
    emptyFav: 'Пока пусто.<br>Нажми ♥ на карточке или в карточке аниме, чтобы добавить.',
    dataAnilist: 'Данные AniList',
    episodes: 'Эпизоды',
    studioLabel: 'Студия',
    related: 'Связанные',
    recommendations: 'Рекомендации',
    inFavorites: '♥ В избранном',
    addFavorite: '♡ В избранное',
    watch: '▶ Смотреть',
    statusFinished: 'Завершён',
    statusReleasing: 'Выходит',
    statusNotYet: 'Анонс',
    statusCancelled: 'Отменён',
    statusHiatus: 'Перерыв',
    noDescription: 'Описание отсутствует.',
    authErrorEmpty: 'Заполните ник и пароль',
    authErrorShort: 'Ник от 2, пароль от 4 символов',
    authErrorExists: 'Такой ник уже занят',
    authErrorWrong: 'Неверный ник или пароль',
    authSuccessReg: 'Регистрация успешна!',
    authSuccessLogin: 'Вход выполнен',
    comments: 'Комментарии',
    commentPlaceholder: 'Поделитесь мнением об аниме...',
    commentPost: 'Отправить',
    commentsEmpty: 'Пока нет комментариев. Будьте первым!',
    commentLoginHint: 'Войдите, чтобы оставить комментарий',
    commentDelete: 'Удалить комментарий'
  },
  en: {
    searchPlaceholder: 'Search anime...',
    navTop: 'Top',
    navAiring: 'Airing',
    navUpcoming: 'Upcoming',
    navMovie: 'Movies',
    navFavorites: 'Favorites',
    login: 'Log in',
    register: 'Sign up',
    nickname: 'Nickname',
    password: 'Password',
    genre: 'Genre',
    allGenres: 'All genres',
    season: 'Season',
    any: 'Any',
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    year: 'Year',
    studio: 'Studio',
    sort: 'Sort',
    sortScore: 'By score',
    sortPopularity: 'By popularity',
    sortTrending: 'Trending',
    sortNew: 'Newest',
    sortTitle: 'By title',
    apply: 'Apply',
    reset: 'Reset',
    loading: 'Loading...',
    prev: '← Prev',
    next: 'Next →',
    page: 'Page',
    of: 'of',
    settings: 'Settings',
    profile: 'Profile',
    show: 'Show',
    hide: 'Hide',
    logout: 'Log out',
    timeOnSite: 'Time on site',
    title: 'Title',
    noTitle: 'you are not worthy',
    noBadgesYet: 'No titles available yet',
    clearTitle: 'Clear title',
    hoursShort: 'h',
    libraryTab: 'Library',
    watchedTitle: 'Watched',
    emptyWatched: 'Nothing watched yet.<br>Open an anime card to add it here.',
    level: 'Level',
    changeAvatar: 'Change avatar',
    watchOnYoutube: 'YouTube',
    watchOnVk: 'VK',
    openVk: 'Open VK Video search →',
    watchOnAnilibria: 'AniLibria',
    anilibriaSearching: 'Searching AniLibria...',
    anilibriaNotFound: 'Nothing found on AniLibria',
    anilibriaChoose: 'Similar titles on AniLibria — pick the right one:',
    anilibriaEpisodes: 'Episodes',
    anilibriaNoEpisodes: 'Episodes not uploaded to the player yet',
    anilibriaBlocked: '⚠ This title may be blocked in Russia',
    anilibriaError: 'Failed to load data from AniLibria',
    anilibriaBack: '← Pick another title',
    badges: 'Badges',
    badgeUnlocked: 'New badge!',
    themeColor: 'Theme color',
    themeHint: 'Text is always white. The wheel changes the background behind posters.',
    pattern: 'Background pattern',
    patternSolid: 'Solid',
    patternGradient: 'Gradient',
    patternLeopard: 'Leopard',
    patternZebra: 'Zebra',
    patternDots: 'Dots',
    patternWaves: 'Waves',
    language: 'Language',
    footer: 'Data from AniList. Favorites are stored locally in the browser.',
    topTitle: 'Top anime',
    topSub: 'Best titles by AniList score',
    airingTitle: 'Airing',
    airingSub: 'Currently airing anime',
    upcomingTitle: 'Upcoming',
    upcomingSub: 'Coming soon',
    movieTitle: 'Anime movies',
    movieSub: 'Feature-length films',
    favTitle: 'Favorites',
    favSub: 'Your saved titles',
    searchResults: 'Search results',
    searchSub: 'For query',
    nothingFound: 'Nothing found',
    emptyFav: 'Empty so far.<br>Tap ♥ on a card or in the anime details to add.',
    dataAnilist: 'AniList data',
    episodes: 'Episodes',
    studioLabel: 'Studio',
    related: 'Related',
    recommendations: 'Recommendations',
    inFavorites: '♥ In favorites',
    addFavorite: '♡ Add to favorites',
    watch: '▶ Watch',
    statusFinished: 'Finished',
    statusReleasing: 'Airing',
    statusNotYet: 'Not yet released',
    statusCancelled: 'Cancelled',
    statusHiatus: 'Hiatus',
    noDescription: 'No description.',
    authErrorEmpty: 'Enter nickname and password',
    authErrorShort: 'Nick min 2, password min 4 characters',
    authErrorExists: 'This nickname is already taken',
    authErrorWrong: 'Wrong nickname or password',
    authSuccessReg: 'Registration successful!',
    authSuccessLogin: 'Logged in',
    comments: 'Comments',
    commentPlaceholder: 'Share your thoughts about this anime...',
    commentPost: 'Post',
    commentsEmpty: 'No comments yet. Be the first!',
    commentLoginHint: 'Log in to leave a comment',
    commentDelete: 'Delete comment'
  }
};

function t(key) {
  const lang = state.lang || 'ru';
  return (i18n[lang] && i18n[lang][key]) || (i18n.ru[key]) || key;
}

const state = {
  currentFilter: 'top',
  currentPage: 1,
  hasNextPage: false,
  totalPages: 1,
  searchQuery: '',
  genre: '',
  season: '',
  year: '',
  studio: '',
  sort: 'SCORE_DESC',
  isLoading: false,
  favorites: loadFavorites(),
  user: null,
  lang: localStorage.getItem(LANG_KEY) || 'ru',
  themeColor: localStorage.getItem(THEME_KEY) || '#0b0d12',
  themePattern: 'gradient',
  authTab: 'login',
  showPassword: false
};

const elements = {
  grid: document.getElementById('animeGrid'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  sectionTitle: document.getElementById('sectionTitle'),
  sectionSubtitle: document.getElementById('sectionSubtitle'),
  pagination: document.getElementById('pagination'),
  pageInfo: document.getElementById('pageInfo'),
  prevPage: document.getElementById('prevPage'),
  nextPage: document.getElementById('nextPage'),
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn'),
  modal: document.getElementById('modal'),
  modalBody: document.getElementById('modalBody'),
  modalClose: document.getElementById('modalClose'),
  navBtns: document.querySelectorAll('.nav-btn'),
  logo: document.getElementById('logo'),
  genreSelect: document.getElementById('genreSelect'),
  seasonSelect: document.getElementById('seasonSelect'),
  yearSelect: document.getElementById('yearSelect'),
  studioInput: document.getElementById('studioInput'),
  studioList: document.getElementById('studioList'),
  sortSelect: document.getElementById('sortSelect'),
  applyFilters: document.getElementById('applyFilters'),
  resetFilters: document.getElementById('resetFilters'),
  favCount: document.getElementById('favCount'),
  filters: document.getElementById('filters'),
  authBtn: document.getElementById('authBtn'),
  profileBtn: document.getElementById('profileBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  authModal: document.getElementById('authModal'),
  authClose: document.getElementById('authClose'),
  authBackdrop: document.getElementById('authBackdrop'),
  authForm: document.getElementById('authForm'),
  authNick: document.getElementById('authNick'),
  authPass: document.getElementById('authPass'),
  authError: document.getElementById('authError'),
  authTabs: document.querySelectorAll('.auth-tab'),
  settingsModal: document.getElementById('settingsModal'),
  settingsClose: document.getElementById('settingsClose'),
  settingsBackdrop: document.getElementById('settingsBackdrop'),
  profileModal: document.getElementById('profileModal'),
  profileClose: document.getElementById('profileClose'),
  profileBackdrop: document.getElementById('profileBackdrop'),
  avatarBtn: document.getElementById('avatarBtn'),
  avatarImg: document.getElementById('avatarImg'),
  avatarPlaceholder: document.getElementById('avatarPlaceholder'),
  avatarInput: document.getElementById('avatarInput'),
  profileNick: document.getElementById('profileNick'),
  profileTitle: document.getElementById('profileTitle'),
  profileTitleRow: document.getElementById('profileTitleRow'),
  profileNickRow: document.getElementById('profileNickRow'),
  titleMenu: document.getElementById('titleMenu'),
  profileTime: document.getElementById('profileTime'),
  xpLevel: document.getElementById('xpLevel'),
  xpBarFill: document.getElementById('xpBarFill'),
  watchedGrid: document.getElementById('watchedGrid'),
  favGrid: document.getElementById('favGrid'),
  logoutBtn: document.getElementById('logoutBtn'),
  colorWheel: document.getElementById('colorWheel'),
  colorPreview: document.getElementById('colorPreview'),
  langBtns: document.querySelectorAll('.lang-btn')
};

function getTitles() {
  return {
    top: { title: t('topTitle'), subtitle: t('topSub') },
    airing: { title: t('airingTitle'), subtitle: t('airingSub') },
    upcoming: { title: t('upcomingTitle'), subtitle: t('upcomingSub') },
    movie: { title: t('movieTitle'), subtitle: t('movieSub') },
    favorites: { title: t('favTitle'), subtitle: t('favSub') }
  };
}

// ——— Favorites ———
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveFavorites() {
  localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites));
  updateFavCount();
  checkBadges();
}

function updateFavCount() {
  const n = Object.keys(state.favorites).length;
  elements.favCount.textContent = n;
  elements.favCount.dataset.zero = n === 0 ? '1' : '0';
}

function isFavorite(id) {
  return !!state.favorites[String(id)];
}

function toggleFavorite(anime) {
  const id = String(anime.id);
  if (state.favorites[id]) {
    delete state.favorites[id];
  } else {
    state.favorites[id] = {
      id: anime.id,
      title: formatTitle(anime),
      cover: (anime.coverImage && (anime.coverImage.large || anime.coverImage.medium)) || '',
      score: anime.averageScore || null,
      format: anime.format || '',
      addedAt: Date.now()
    };
  }
  saveFavorites();
  return isFavorite(id);
}

// ——— Comments (общие для всех пользователей через Supabase REST API) ———
// Комментарии, в отличие от избранного, должны быть видны всем посетителям
// сайта, а не только в браузере автора — localStorage для этого не подходит,
// он живёт только на одном устройстве. Поэтому комментарии хранятся в общей
// таблице на Supabase (бесплатный облачный Postgres с готовым REST API).
//
// Чтобы включить общие комментарии, один раз настройте бесплатный проект:
//   1. Зарегистрируйтесь на https://supabase.com и создайте проект (Free tier).
//   2. В SQL Editor выполните:
//        create table comments (
//          id uuid primary key default gen_random_uuid(),
//          anime_id text not null,
//          nick text not null,
//          avatar text,
//          text text not null,
//          created_at timestamptz not null default now()
//        );
//        alter table comments enable row level security;
//        create policy "public read" on comments for select using (true);
//        create policy "public insert" on comments for insert with check (true);
//        create policy "public delete" on comments for delete using (true);
//   3. В настройках проекта (Project Settings → API) скопируйте "Project URL"
//      и "anon public" ключ и вставьте их ниже вместо заглушек.
// Пока значения не заменены, приложение автоматически работает в резервном
// режиме — комментарии сохраняются только в localStorage текущего браузера.
const SUPABASE_URL = 'https://ougbcvafsamqtvdnznqz.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91Z2JjdmFmc2FtcXR2ZG56bnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDkxNTIsImV4cCI6MjEwMTc4NTE1Mn0.l0j0SySd3ehLqxvFg5ibF397Hm0BI2CVIpRPZGkA7vE';
const SUPABASE_CONFIGURED = SUPABASE_URL.indexOf('YOUR-PROJECT') === -1 && SUPABASE_ANON_KEY.indexOf('YOUR-ANON-KEY') === -1;
const COMMENTS_POLL_MS = 15000;
let commentsPollTimer = null;

function supabaseHeaders(extra) {
  return Object.assign({
    apikey: SUPABASE_ANON_KEY,
    Authorization: 'Bearer ' + SUPABASE_ANON_KEY
  }, extra || {});
}

// ——— Резервное хранилище на случай, если Supabase не настроен ———
function loadLocalComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveLocalComments(map) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(map));
}

function getLocalComments(animeId) {
  const map = loadLocalComments();
  return (map[String(animeId)] || []).slice().sort(function(a, b) { return b.createdAt - a.createdAt; });
}

function addLocalComment(animeId, nick, avatar, text) {
  const map = loadLocalComments();
  const id = String(animeId);
  if (!map[id]) map[id] = [];
  map[id].push({
    cid: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    nick: nick,
    avatar: avatar,
    text: text,
    createdAt: Date.now()
  });
  saveLocalComments(map);
}

function deleteLocalComment(animeId, cid) {
  const map = loadLocalComments();
  const id = String(animeId);
  if (!map[id]) return;
  map[id] = map[id].filter(function(c) { return c.cid !== cid; });
  saveLocalComments(map);
}

// ——— Общие функции (Supabase, с откатом на localStorage при ошибке) ———
async function getComments(animeId) {
  if (SUPABASE_CONFIGURED) {
    try {
      const url = SUPABASE_URL + '/rest/v1/comments?anime_id=eq.' + encodeURIComponent(String(animeId)) +
        '&select=id,nick,avatar,text,created_at&order=created_at.desc' +
        '&_=' + Date.now(); // разбиваем кэш браузера, чтобы список подтягивал новые комментарии при опросе
      const res = await fetch(url, { headers: supabaseHeaders(), cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const rows = await res.json();
      return rows.map(function(r) {
        return { cid: r.id, nick: r.nick, avatar: r.avatar, text: r.text, createdAt: new Date(r.created_at).getTime() };
      });
    } catch (e) {
      console.warn('Supabase comments fetch failed, using local fallback', e);
    }
  }
  return getLocalComments(animeId);
}

async function addComment(animeId, text) {
  if (!state.user) return;
  const nick = state.user.nick;
  const avatar = loadAvatar() || null;
  if (SUPABASE_CONFIGURED) {
    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/comments', {
        method: 'POST',
        headers: supabaseHeaders({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
        body: JSON.stringify({ anime_id: String(animeId), nick: nick, avatar: avatar, text: text })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return;
    } catch (e) {
      console.warn('Supabase comment insert failed, saving locally instead', e);
    }
  }
  addLocalComment(animeId, nick, avatar, text);
}

async function deleteComment(animeId, cid) {
  if (SUPABASE_CONFIGURED) {
    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/comments?id=eq.' + encodeURIComponent(cid), {
        method: 'DELETE',
        headers: supabaseHeaders()
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return;
    } catch (e) {
      console.warn('Supabase comment delete failed, trying local fallback', e);
    }
  }
  deleteLocalComment(animeId, cid);
}

function formatCommentDate(ts) {
  try {
    return new Date(ts).toLocaleString(state.lang === 'en' ? 'en-US' : 'ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return '';
  }
}

function commentsListToHtml(list) {
  if (!list.length) return '<p class="comments-empty">' + t('commentsEmpty') + '</p>';
  return list.map(function(c) {
    const mine = !!(state.user && state.user.nick === c.nick);
    const avatarHtml = c.avatar
      ? '<img src="' + c.avatar + '" alt="" class="comment-avatar-img">'
      : '<span class="comment-avatar-placeholder">🙂</span>';
    return (
      '<div class="comment-item">' +
        '<div class="comment-avatar">' + avatarHtml + '</div>' +
        '<div class="comment-body">' +
          '<div class="comment-head">' +
            '<span class="comment-nick">' + escapeHtml(c.nick) + '</span>' +
            '<span class="comment-date">' + formatCommentDate(c.createdAt) + '</span>' +
            (mine ? '<button type="button" class="comment-delete" data-cid="' + escapeHtml(c.cid) + '" title="' + t('commentDelete') + '">×</button>' : '') +
          '</div>' +
          '<p class="comment-text">' + escapeHtml(c.text).replace(/\n/g, '<br>') + '</p>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

function renderCommentsSectionHtml() {
  const formHtml = state.user
    ? (
      '<form class="comment-form" id="commentForm">' +
        '<textarea id="commentInput" class="comment-input" maxlength="500" placeholder="' + escapeHtml(t('commentPlaceholder')) + '" required></textarea>' +
        '<button type="submit" class="btn-primary comment-submit">' + t('commentPost') + '</button>' +
      '</form>'
    )
    : '<button type="button" class="comment-login-hint" id="commentLoginHint">' + escapeHtml(t('commentLoginHint')) + '</button>';

  return (
    '<div class="comments-section">' +
      '<h3>' + t('comments') + '</h3>' +
      formHtml +
      '<div class="comments-list" id="commentsList"><p class="comments-empty">' + escapeHtml(t('loading')) + '</p></div>' +
    '</div>'
  );
}

async function refreshCommentsList(animeId) {
  const listEl = document.getElementById('commentsList');
  if (!listEl) return;
  const list = await getComments(animeId);
  // модалка могла успеть закрыться/смениться, пока шёл запрос
  if (!document.getElementById('commentsList') || elements.modal.classList.contains('hidden')) return;
  listEl.innerHTML = commentsListToHtml(list);
  bindCommentDeleteButtons(animeId);
}

function bindCommentDeleteButtons(animeId) {
  document.querySelectorAll('.comment-delete').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.disabled = true;
      deleteComment(animeId, btn.dataset.cid).finally(function() {
        refreshCommentsList(animeId);
      });
    });
  });
}

function attachCommentsHandlers(animeId) {
  const form = document.getElementById('commentForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = document.getElementById('commentInput');
      const submitBtn = form.querySelector('.comment-submit');
      const text = input.value.trim();
      if (!text) return;
      if (submitBtn) submitBtn.disabled = true;
      addComment(animeId, text).finally(function() {
        input.value = '';
        if (submitBtn) submitBtn.disabled = false;
        refreshCommentsList(animeId);
      });
    });
  }
  const loginHint = document.getElementById('commentLoginHint');
  if (loginHint) loginHint.addEventListener('click', openAuthModal);

  refreshCommentsList(animeId);

  if (commentsPollTimer) clearInterval(commentsPollTimer);
  if (SUPABASE_CONFIGURED) {
    commentsPollTimer = setInterval(function() { refreshCommentsList(animeId); }, COMMENTS_POLL_MS);
  }
}

function stopCommentsPolling() {
  if (commentsPollTimer) {
    clearInterval(commentsPollTimer);
    commentsPollTimer = null;
  }
}

// ——— Auth (localStorage) ———
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  state.user = user;
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  updateAuthUI();
  checkBadges();
}

function updateAuthUI() {
  if (state.user) {
    elements.authBtn.classList.add('hidden');
    elements.profileBtn.classList.remove('hidden');
    elements.profileBtn.title = state.user.nick;
    elements.settingsBtn.classList.remove('hidden');
  } else {
    elements.authBtn.classList.remove('hidden');
    elements.profileBtn.classList.add('hidden');
    elements.settingsBtn.classList.add('hidden');
  }
}

// ——— Avatar ———
function loadAvatar() {
  try {
    return localStorage.getItem(AVATAR_KEY) || '';
  } catch {
    return '';
  }
}

function saveAvatar(dataUrl) {
  try {
    localStorage.setItem(AVATAR_KEY, dataUrl);
  } catch (e) {
    console.warn('avatar save failed', e);
  }
}

function updateAvatarUI() {
  if (!elements.avatarImg) return;
  const src = loadAvatar();
  if (src) {
    elements.avatarImg.src = src;
    elements.avatarImg.classList.remove('hidden');
    if (elements.avatarPlaceholder) elements.avatarPlaceholder.classList.add('hidden');
  } else {
    elements.avatarImg.classList.add('hidden');
    elements.avatarImg.removeAttribute('src');
    if (elements.avatarPlaceholder) elements.avatarPlaceholder.classList.remove('hidden');
  }
}

function handleAvatarFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Обрезаем по центру в квадрат и уменьшаем, чтобы не раздувать localStorage
      const size = 200;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const s = Math.min(img.width, img.height);
      const sx = (img.width - s) / 2;
      const sy = (img.height - s) / 2;
      ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
      let dataUrl;
      try {
        dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      } catch (err) {
        console.warn('avatar processing failed', err);
        return;
      }
      saveAvatar(dataUrl);
      updateAvatarUI();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}


// ——— Time on site ———
function loadTimeSeconds() {
  return parseInt(localStorage.getItem(TIME_KEY) || '0', 10) || 0;
}

function saveTimeSeconds(sec) {
  localStorage.setItem(TIME_KEY, String(Math.max(0, Math.floor(sec))));
}

function formatTimeHours(sec) {
  const h = sec / 3600;
  if (h < 0.1) return (Math.round(h * 10) / 10) + ' ' + t('hoursShort');
  if (h < 10) return (Math.round(h * 10) / 10) + ' ' + t('hoursShort');
  return Math.floor(h) + ' ' + t('hoursShort');
}

let timeTickTimer = null;
let sessionStartedAt = Date.now();
let baseTimeSeconds = loadTimeSeconds();

function startTimeTracking() {
  baseTimeSeconds = loadTimeSeconds();
  sessionStartedAt = Date.now();
  if (timeTickTimer) clearInterval(timeTickTimer);
  timeTickTimer = setInterval(function() {
    const elapsed = Math.floor((Date.now() - sessionStartedAt) / 1000);
    saveTimeSeconds(baseTimeSeconds + elapsed);
    checkBadges();
    if (elements.profileTime && !elements.profileModal.classList.contains('hidden')) {
      elements.profileTime.textContent = formatTimeHours(baseTimeSeconds + elapsed);
      updateXPUI();
    }
  }, 5000);
  // flush on leave
  window.addEventListener('beforeunload', flushTime);
}

function flushTime() {
  const elapsed = Math.floor((Date.now() - sessionStartedAt) / 1000);
  saveTimeSeconds(baseTimeSeconds + elapsed);
  baseTimeSeconds = loadTimeSeconds();
  sessionStartedAt = Date.now();
}

function getTimeSecondsNow() {
  const elapsed = Math.floor((Date.now() - sessionStartedAt) / 1000);
  return baseTimeSeconds + elapsed;
}

// ——— XP / уровень ———
// Уровень 1 открывается при 10ч на сайте, дальше каждые +5ч следующий уровень (15ч-2ур, 20ч-3ур, ...)
function getLevelInfo(hours) {
  let level = 0;
  let prevThreshold = 0;
  let nextThreshold = XP_START_HOURS;
  while (hours >= nextThreshold) {
    level++;
    prevThreshold = nextThreshold;
    nextThreshold += XP_STEP_HOURS;
  }
  const span = nextThreshold - prevThreshold;
  const progress = span > 0 ? Math.max(0, Math.min(1, (hours - prevThreshold) / span)) : 0;
  return { level: level, prevThreshold: prevThreshold, nextThreshold: nextThreshold, progress: progress };
}

function updateXPUI() {
  if (!elements.xpBarFill) return;
  const hours = getTimeSecondsNow() / 3600;
  const info = getLevelInfo(hours);
  elements.xpLevel.textContent = t('level') + ' ' + info.level;
  elements.xpBarFill.style.width = (info.progress * 100) + '%';
}

// ——— Watched (просмотренные) ———
function loadWatched() {
  try {
    return JSON.parse(localStorage.getItem(WATCHED_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveWatchedMap(map) {
  localStorage.setItem(WATCHED_KEY, JSON.stringify(map));
}

function addToWatched(anime) {
  const map = loadWatched();
  const id = String(anime.id);
  map[id] = {
    id: anime.id,
    title: formatTitle(anime),
    cover: (anime.coverImage && (anime.coverImage.extraLarge || anime.coverImage.large || anime.coverImage.medium)) || '',
    score: anime.averageScore || null,
    format: anime.format || '',
    viewedAt: Date.now()
  };

  // Оставляем только последние WATCHED_LIMIT просмотренных тайтлов
  const entries = Object.values(map).sort(function(a, b) { return (b.viewedAt || 0) - (a.viewedAt || 0); });
  if (entries.length > WATCHED_LIMIT) {
    const trimmed = {};
    entries.slice(0, WATCHED_LIMIT).forEach(function(e) { trimmed[String(e.id)] = e; });
    saveWatchedMap(trimmed);
  } else {
    saveWatchedMap(map);
  }
}

function renderMiniGrid(container, list, emptyHtml) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<p class="mini-empty">' + emptyHtml + '</p>';
    return;
  }
  container.innerHTML = list.map(function(item) {
    const score = item.score ? (item.score / 10).toFixed(1) : '—';
    return '<div class="mini-card" data-id="' + item.id + '">' +
      '<img src="' + item.cover + '" alt="' + escapeHtml(item.title) + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/300x450/1a1f2a/8b93a7?text=No+Image\'">' +
      '<div class="mini-card-info">' +
        '<span class="mini-card-title">' + escapeHtml(item.title) + '</span>' +
        '<span class="mini-card-score">★ ' + score + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
  container.querySelectorAll('.mini-card').forEach(function(card) {
    card.addEventListener('click', function() {
      closeProfileModal();
      openModal(card.dataset.id);
    });
  });
}

function renderLibraryTab() {
  const watchedList = Object.values(loadWatched()).sort(function(a, b) { return (b.viewedAt || 0) - (a.viewedAt || 0); });
  renderMiniGrid(elements.watchedGrid, watchedList, t('emptyWatched'));

  const favList = Object.values(state.favorites).sort(function(a, b) { return (b.addedAt || 0) - (a.addedAt || 0); });
  renderMiniGrid(elements.favGrid, favList, t('emptyFav'));
}

// ——— Stats (for badge conditions) ———
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function bumpStat(key, by) {
  by = by || 1;
  const stats = loadStats();
  stats[key] = (stats[key] || 0) + by;
  saveStats(stats);
  checkBadges();
  return stats[key];
}

function getStat(key) {
  return loadStats()[key] || 0;
}

// ——— Badges ———
// Чтобы добавить новый бейдж: допишите объект в BADGE_DEFS.
// id — уникальный ключ, icon — эмодзи, name/desc — тексты (ru/en),
// check(ctx) — вернуть true, если бейдж получен.
const BADGE_DEFS = [
  {
    id: 'speed_mode',
    icon: '⚡',
    name: { ru: 'Сверхскоростной режим', en: 'Hyper Speed Mode' },
    desc: { ru: '', en: '' },
    check: function(ctx) { return !!ctx.stats.speedMode; }
  }
];

function loadEarnedBadges() {
  try {
    return JSON.parse(localStorage.getItem(BADGES_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveEarnedBadges(map) {
  localStorage.setItem(BADGES_KEY, JSON.stringify(map));
}

function getBadgeContext() {
  return {
    user: state.user,
    favCount: Object.keys(state.favorites || {}).length,
    timeSec: getTimeSecondsNow(),
    stats: loadStats()
  };
}

function checkBadges() {
  const earned = loadEarnedBadges();
  const ctx = getBadgeContext();
  let changed = false;
  BADGE_DEFS.forEach(function(def) {
    if (earned[def.id]) return;
    try {
      if (def.check(ctx)) {
        earned[def.id] = Date.now();
        changed = true;
        showBadgeToast(def);
      }
    } catch (e) {
      console.warn('badge check failed', def.id, e);
    }
  });
  if (changed) saveEarnedBadges(earned);
  return earned;
}

function showBadgeToast(def) {
  let el = document.getElementById('badgeToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'badgeToast';
    el.className = 'badge-toast';
    el.innerHTML = '<div class="badge-toast-icon"></div><div class="badge-toast-text"></div>';
    document.body.appendChild(el);
  }
  const lang = state.lang || 'ru';
  el.querySelector('.badge-toast-icon').textContent = def.icon;
  el.querySelector('.badge-toast-text').innerHTML =
    '<strong>' + t('badgeUnlocked') + '</strong><small>' +
    (def.name[lang] || def.name.ru) + '</small>';
  el.classList.add('show');
  clearTimeout(showBadgeToast._t);
  showBadgeToast._t = setTimeout(function() { el.classList.remove('show'); }, 3500);
}

function getSelectedTitleId() {
  return localStorage.getItem(TITLE_KEY) || '';
}

function setSelectedTitleId(id) {
  if (id) localStorage.setItem(TITLE_KEY, id);
  else localStorage.removeItem(TITLE_KEY);
}

function getBadgeDef(id) {
  return BADGE_DEFS.find(function(b) { return b.id === id; }) || null;
}

function updateProfileTitle() {
  if (!elements.profileTitle) return;
  const lang = state.lang || 'ru';
  const id = getSelectedTitleId();
  const earned = loadEarnedBadges();
  const def = id && earned[id] ? getBadgeDef(id) : null;
  if (def) {
    elements.profileTitle.textContent = def.icon + ' ' + (def.name[lang] || def.name.ru);
    elements.profileTitle.classList.add('has-title');
  } else {
    if (id && !earned[id]) setSelectedTitleId('');
    elements.profileTitle.textContent = t('noTitle');
    elements.profileTitle.classList.remove('has-title');
  }
}

function renderTitleMenu() {
  if (!elements.titleMenu) return;
  const lang = state.lang || 'ru';
  const earned = checkBadges();
  const selected = getSelectedTitleId();
  const available = BADGE_DEFS.filter(function(def) { return !!earned[def.id]; });

  let html = '';
  if (!available.length) {
    html = '<div class="title-menu-empty">' + t('noBadgesYet') + '</div>';
  } else {
    html = available.map(function(def) {
      const active = selected === def.id ? ' active' : '';
      return '<button type="button" class="title-menu-item' + active + '" data-title-id="' + def.id + '">' +
        '<span class="tm-icon">' + def.icon + '</span>' +
        '<span>' + (def.name[lang] || def.name.ru) + '</span>' +
        '</button>';
    }).join('');
    html += '<button type="button" class="title-menu-item" data-title-id="">' +
      '<span class="tm-icon">∅</span><span>' + t('clearTitle') + '</span></button>';
  }
  elements.titleMenu.innerHTML = html;
  elements.titleMenu.querySelectorAll('[data-title-id]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      setSelectedTitleId(btn.getAttribute('data-title-id') || '');
      updateProfileTitle();
      elements.titleMenu.classList.add('hidden');
    });
  });
}

function toggleTitleMenu() {
  if (!elements.titleMenu) return;
  const willOpen = elements.titleMenu.classList.contains('hidden');
  if (willOpen) {
    renderTitleMenu();
    elements.titleMenu.classList.remove('hidden');
  } else {
    elements.titleMenu.classList.add('hidden');
  }
}

function renderBadges() {
  // backward-compatible hook: refresh title UI
  updateProfileTitle();
}


function openAuthModal() {
  state.authTab = 'login';
  elements.authTabs.forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.tab === 'login');
  });
  elements.authForm.querySelector('.auth-submit').textContent = t('login');
  elements.authError.classList.add('hidden');
  elements.authNick.value = '';
  elements.authPass.value = '';
  elements.authModal.classList.remove('hidden');
}


function closeAuthModal() {
  elements.authModal.classList.add('hidden');
}

function openSettingsModal() {
  if (!state.user) return;
  // tabs -> theme (первая доступная вкладка)
  document.querySelectorAll('.settings-tab').forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.stab === 'theme');
  });
  document.querySelectorAll('.settings-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'panel-theme');
  });
  elements.langBtns.forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
  applyThemeColor(state.themeColor);
  applyThemePattern(state.themePattern, false);
  drawColorWheel();
  elements.settingsModal.classList.remove('hidden');
}

function closeSettingsModal() {
  elements.settingsModal.classList.add('hidden');
}

function openProfileModal() {
  if (!state.user) return;
  elements.profileNick.textContent = state.user.nick;
  elements.profileTime.textContent = formatTimeHours(getTimeSecondsNow());
  updateXPUI();
  updateAvatarUI();
  renderLibraryTab();
  if (elements.titleMenu) elements.titleMenu.classList.add('hidden');
  updateProfileTitle();
  renderBadges();
  elements.profileModal.classList.remove('hidden');
}

function closeProfileModal() {
  elements.profileModal.classList.add('hidden');
}

// ——— Theme (color wheel) ———
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(function(v) {
    return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  }).join('');
}

function lightenHex(hex, percent) {
  const c = hexToRgb(hex);
  const r = c.r + Math.round((255 - c.r) * (percent / 100));
  const g = c.g + Math.round((255 - c.g) * (percent / 100));
  const b = c.b + Math.round((255 - c.b) * (percent / 100));
  return rgbToHex(r, g, b);
}

function darkenHex(hex, percent) {
  const c = hexToRgb(hex);
  const f = 1 - percent / 100;
  return rgbToHex(c.r * f, c.g * f, c.b * f);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = function(n) {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}

function buildPattern(pattern, base) {
  // Vertical gradient: bottom = dark, top = light
  const top = lightenHex(base, 28);
  const mid = lightenHex(base, 12);
  const bottom = darkenHex(base, 18);
  return {
    image: 'linear-gradient(to top, ' + bottom + ' 0%, ' + base + ' 35%, ' + mid + ' 70%, ' + top + ' 100%)',
    size: '100% 100%'
  };
}

function applyThemeColor(hex, fromUser) {
  // Keep background reasonably dark so white text stays readable
  if (fromUser) bumpStat('themeChanges');
  state.themeColor = hex;
  localStorage.setItem(THEME_KEY, hex);

  const card = lightenHex(hex, 12);
  const cardHover = lightenHex(hex, 22);
  const border = lightenHex(hex, 28);

  document.documentElement.style.setProperty('--bg', hex);
  document.documentElement.style.setProperty('--bg-card', card);
  document.documentElement.style.setProperty('--bg-card-hover', cardHover);
  document.documentElement.style.setProperty('--border', border);

  // Accent stays a complementary bright color derived from hue of bg, or fixed purple if near black
  const rgb = hexToRgb(hex);
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  let accent = '#7c5cff';
  if (max > 30) {
    // shift toward a vivid accent from the same hue family
    accent = lightenHex(hex, 55);
    // boost saturation-ish by mixing toward pure channel
    const a = hexToRgb(accent);
    const boost = 1.35;
    accent = rgbToHex(
      Math.min(255, a.r * boost),
      Math.min(255, a.g * boost),
      Math.min(255, a.b * boost)
    );
  }
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-hover', lightenHex(accent, 12));

  applyThemePattern(state.themePattern, true);

  if (elements.colorPreview) {
    elements.colorPreview.style.background = hex;
  }
  document.querySelectorAll('.preset-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.color.toLowerCase() === hex.toLowerCase());
  });
}

function applyThemePattern(pattern, animate) {
  const nextPattern = 'gradient';
  const isSame = nextPattern === state.themePattern && !animate;
  state.themePattern = nextPattern;
  localStorage.setItem('animehub_pattern', state.themePattern);

  const p = buildPattern(state.themePattern, state.themeColor);
  document.documentElement.style.setProperty('--bg-pattern', p.image);
  document.documentElement.style.setProperty('--bg-pattern-size', p.size);

  const layer = document.getElementById('bgLayer');
  const next = document.getElementById('bgLayerNext');
  if (!layer || !next) return;

  // Always keep base layer color in sync
  layer.style.backgroundColor = state.themeColor;
  next.style.backgroundColor = state.themeColor;

  if (animate === false) {
    layer.style.backgroundImage = p.image;
    layer.style.backgroundSize = p.size;
    next.classList.remove('is-animating');
    next.style.backgroundImage = 'none';
    return;
  }

  // Crossfade: paint new pattern on next layer, fade in, then commit to base layer
  next.style.backgroundImage = p.image;
  next.style.backgroundSize = p.size;
  next.style.backgroundColor = state.themeColor;

  // force reflow so transition runs
  void next.offsetWidth;
  next.classList.add('is-animating');

  window.clearTimeout(applyThemePattern._timer);
  applyThemePattern._timer = window.setTimeout(function() {
    layer.style.backgroundImage = p.image;
    layer.style.backgroundSize = p.size;
    layer.style.backgroundColor = state.themeColor;
    next.classList.remove('is-animating');
    // clear next after fade-out settles
    window.setTimeout(function() {
      if (!next.classList.contains('is-animating')) {
        next.style.backgroundImage = 'none';
      }
    }, 560);
  }, 560);
}

function drawColorWheel() {
  const canvas = elements.colorWheel;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;

  ctx.clearRect(0, 0, size, size);

  // Outer ring: hue
  for (let angle = 0; angle < 360; angle++) {
    const start = ((angle - 1) * Math.PI) / 180;
    const end = ((angle + 1) * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = 'hsl(' + angle + ', 100%, 50%)';
    ctx.fill();
  }

  // Inner circle (dark) so center is not used for pure white/black extremes
  const innerR = radius * 0.35;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
  grad.addColorStop(0, 'rgba(11,13,18,0.95)');
  grad.addColorStop(1, 'rgba(11,13,18,0.6)');
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Soft edge
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function pickColorFromWheel(e) {
  const canvas = elements.colorWheel;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) * scaleX;
  const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) * scaleY;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = canvas.width / 2 - 2;
  if (dist > radius || dist < radius * 0.3) return;

  let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  // map distance to saturation (outer = 100%, near inner = ~60%)
  const sat = 60 + ((dist - radius * 0.3) / (radius * 0.7)) * 40;
  const hex = hslToHex(angle, Math.min(sat, 70), 12 + (dist / radius) * 10);
  applyThemeColor(hex, true);
}

// ——— Language ———
function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-title');
    if (key) el.title = t(key);
  });

  // Update year "any" option etc. that may have been rebuilt
  const anyOpts = elements.yearSelect.querySelectorAll('option[value=""]');
  anyOpts.forEach(function(o) { o.textContent = t('any'); });

  // Genre first option
  const genreFirst = elements.genreSelect.querySelector('option[value=""]');
  if (genreFirst) genreFirst.textContent = t('allGenres');

  // Season options
  const seasonMap = { '': 'any', WINTER: 'winter', SPRING: 'spring', SUMMER: 'summer', FALL: 'fall' };
  Array.from(elements.seasonSelect.options).forEach(function(opt) {
    const k = seasonMap[opt.value];
    if (k) opt.textContent = t(k);
  });

  // Sort options
  const sortMap = {
    SCORE_DESC: 'sortScore',
    POPULARITY_DESC: 'sortPopularity',
    TRENDING_DESC: 'sortTrending',
    START_DATE_DESC: 'sortNew',
    TITLE_ROMAJI: 'sortTitle'
  };
  Array.from(elements.sortSelect.options).forEach(function(opt) {
    const k = sortMap[opt.value];
    if (k) opt.textContent = t(k);
  });

  // Auth submit & tabs
  const submit = elements.authForm && elements.authForm.querySelector('.auth-submit');
  if (submit) submit.textContent = state.authTab === 'register' ? t('register') : t('login');

  elements.langBtns.forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Refresh section titles if not loading
  if (!state.isLoading) {
    const titles = getTitles();
    if (state.searchQuery) {
      elements.sectionTitle.textContent = t('searchResults');
      elements.sectionSubtitle.textContent = t('searchSub') + ' «' + state.searchQuery + '»';
    } else if (titles[state.currentFilter]) {
      elements.sectionTitle.textContent = titles[state.currentFilter].title;
      elements.sectionSubtitle.textContent = titles[state.currentFilter].subtitle;
    }
    updatePagination();
  }
}

// ——— GraphQL ———
async function gql(query, variables) {
  variables = variables || {};
  const res = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query: query, variables: variables })
  });
  if (res.status === 429) throw new Error(state.lang === 'en' ? 'Too many requests. Wait a few seconds.' : 'Слишком много запросов. Подождите пару секунд.');
  if (!res.ok) throw new Error((state.lang === 'en' ? 'Network error: ' : 'Ошибка сети: ') + res.status);
  const json = await res.json();
  if (json.errors && json.errors.length) throw new Error(json.errors[0].message || 'AniList error');
  return json.data;
}

const MEDIA_FIELDS = `
  id
  title { romaji english native }
  coverImage { large medium }
  averageScore
  format
  status
  episodes
  season
  seasonYear
  genres
  siteUrl
  trailer { id site }
  studios(isMain: true) { nodes { id name } }
`;

function buildMediaQuery() {
  return `
    query (
      $page: Int, $perPage: Int, $search: String, $genre: String,
      $season: MediaSeason, $seasonYear: Int, $sort: [MediaSort],
      $status: MediaStatus, $format: MediaFormat
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { total currentPage lastPage hasNextPage }
        media(
          type: ANIME
          search: $search
          genre: $genre
          season: $season
          seasonYear: $seasonYear
          sort: $sort
          status: $status
          format: $format
          isAdult: false
        ) { ${MEDIA_FIELDS} }
      }
    }
  `;
}

const DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english native }
      coverImage { extraLarge large }
      averageScore
      format
      status
      episodes
      season
      seasonYear
      genres
      description(asHtml: false)
      siteUrl
      trailer { id site }
      studios { nodes { name isAnimationStudio } }
      recommendations(page: 1, perPage: 8, sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title { romaji english }
            coverImage { medium large }
            averageScore
            format
          }
        }
      }
      relations {
        edges {
          relationType
          node {
            id
            title { romaji english }
            coverImage { medium }
            format
            type
          }
        }
      }
    }
  }
`;

const STUDIO_SEARCH = `
  query ($search: String) {
    Page(page: 1, perPage: 10) {
      studios(search: $search, sort: SEARCH_MATCH) {
        id
        name
        isAnimationStudio
      }
    }
  }
`;

const GENRES_QUERY = `query { GenreCollection }`;

// ——— Helpers ———
function showLoading(show) {
  elements.loading.classList.toggle('hidden', !show);
  if (show) {
    elements.grid.innerHTML = '';
    elements.error.classList.add('hidden');
    elements.pagination.classList.add('hidden');
  }
}

function showError(msg) {
  elements.error.textContent = msg;
  elements.error.classList.remove('hidden');
  elements.loading.classList.add('hidden');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripHtml(html) {
  if (!html) return '';
  const t = document.createElement('div');
  t.innerHTML = html;
  return t.textContent || t.innerText || '';
}

function formatTitle(a) {
  return (a.title && (a.title.english || a.title.romaji || a.title.native)) || a.title || (state.lang === 'en' ? 'Untitled' : 'Без названия');
}

function seasonLabel(s) {
  const map = { WINTER: t('winter'), SPRING: t('spring'), SUMMER: t('summer'), FALL: t('fall') };
  return map[s] || s || '';
}

// ——— Init filters ———
async function initFilters() {
  const cy = new Date().getFullYear();
  let yo = '<option value="">' + t('any') + '</option>';
  for (let y = cy + 1; y >= cy - 35; y--) yo += '<option value="' + y + '">' + y + '</option>';
  elements.yearSelect.innerHTML = yo;

  elements.studioList.innerHTML = POPULAR_STUDIOS.map(function(s) {
    return '<option value="' + escapeHtml(s) + '">';
  }).join('');

  try {
    const data = await gql(GENRES_QUERY);
    const genres = (data.GenreCollection || []).filter(function(g) { return g && g !== 'Hentai'; });
    elements.genreSelect.innerHTML = '<option value="">' + t('allGenres') + '</option>' +
      genres.map(function(g) { return '<option value="' + escapeHtml(g) + '">' + escapeHtml(g) + '</option>'; }).join('');
  } catch (e) {
    console.warn('Genres load failed', e);
  }
}

async function resolveStudioId(name) {
  if (!name || !name.trim()) return null;
  try {
    const data = await gql(STUDIO_SEARCH, { search: name.trim() });
    const studios = (data.Page && data.Page.studios) || [];
    const exact = studios.find(function(s) {
      return s.name.toLowerCase() === name.trim().toLowerCase() && s.isAnimationStudio;
    });
    if (exact) return exact.id;
    const any = studios.find(function(s) { return s.isAnimationStudio; }) || studios[0];
    return any ? any.id : null;
  } catch {
    return null;
  }
}

function getVariables(page) {
  const vars = {
    page: page,
    perPage: PER_PAGE,
    sort: [state.sort || 'SCORE_DESC']
  };
  if (state.searchQuery) vars.search = state.searchQuery;
  if (state.genre) vars.genre = state.genre;
  if (state.season) vars.season = state.season;
  if (state.year) vars.seasonYear = parseInt(state.year, 10);

  if (!state.searchQuery && state.currentFilter !== 'favorites') {
    if (state.currentFilter === 'airing') {
      vars.status = 'RELEASING';
      if (!state.sort || state.sort === 'SCORE_DESC') vars.sort = ['POPULARITY_DESC'];
    } else if (state.currentFilter === 'upcoming') {
      vars.status = 'NOT_YET_RELEASED';
      if (!state.sort || state.sort === 'SCORE_DESC') vars.sort = ['POPULARITY_DESC'];
    } else if (state.currentFilter === 'movie') {
      vars.format = 'MOVIE';
    }
  }
  if (state.searchQuery) vars.sort = ['SEARCH_MATCH', 'POPULARITY_DESC'];
  return vars;
}

async function loadAnime(page) {
  page = page || 1;
  if (state.isLoading) return;

  if (state.currentFilter === 'favorites') {
    renderFavorites();
    return;
  }

  state.isLoading = true;
  showLoading(true);

  const titles = getTitles();
  var info = state.searchQuery
    ? { title: t('searchResults'), subtitle: t('searchSub') + ' «' + state.searchQuery + '»' }
    : titles[state.currentFilter];

  var parts = [];
  if (state.genre) parts.push(state.genre);
  if (state.season) parts.push(seasonLabel(state.season));
  if (state.year) parts.push(state.year);
  if (state.studio) parts.push(state.studio);
  if (parts.length) info.subtitle = (info.subtitle ? info.subtitle + ' · ' : '') + parts.join(' · ');

  elements.sectionTitle.textContent = info.title;
  elements.sectionSubtitle.textContent = info.subtitle || t('dataAnilist');
  elements.filters.classList.remove('hidden');

  try {
    var studioId = null;
    if (state.studio) studioId = await resolveStudioId(state.studio);

    const data = await gql(buildMediaQuery(), getVariables(page));
    const pi = data.Page.pageInfo;
    var list = data.Page.media || [];
    if (studioId) {
      list = list.filter(function(anime) {
        var nodes = (anime.studios && anime.studios.nodes) || [];
        return nodes.some(function(s) { return s.id === studioId; });
      });
    }
    state.currentPage = pi.currentPage;
    state.hasNextPage = pi.hasNextPage;
    state.totalPages = pi.lastPage || 1;
    renderAnime(list);
    updatePagination();
  } catch (err) {
    showError(err.message || (state.lang === 'en' ? 'Failed to load' : 'Не удалось загрузить'));
  } finally {
    state.isLoading = false;
    showLoading(false);
  }
}

function renderFavorites() {
  elements.filters.classList.add('hidden');
  const titles = getTitles();
  elements.sectionTitle.textContent = titles.favorites.title;
  elements.sectionSubtitle.textContent = titles.favorites.subtitle;
  elements.pagination.classList.add('hidden');
  elements.error.classList.add('hidden');
  elements.loading.classList.add('hidden');

  const list = Object.values(state.favorites).sort(function(a, b) { return (b.addedAt || 0) - (a.addedAt || 0); });
  if (!list.length) {
    elements.grid.innerHTML = '<div class="empty-fav"><div class="heart">♥</div><p>' + t('emptyFav') + '</p></div>';
    return;
  }
  const mapped = list.map(function(f) {
    return {
      id: f.id,
      title: { english: f.title },
      coverImage: { large: f.cover },
      averageScore: f.score,
      format: f.format
    };
  });
  renderAnime(mapped);
}

function renderAnime(list) {
  if (!list.length) {
    elements.grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px">' + t('nothingFound') + '</p>';
    return;
  }

  elements.grid.innerHTML = list.map(function(anime) {
    const img = (anime.coverImage && (anime.coverImage.large || anime.coverImage.medium)) || '';
    const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : '—';
    const format = anime.format || '';
    const title = formatTitle(anime);
    const fav = isFavorite(anime.id);

    return '<article class="anime-card" data-id="' + anime.id + '">' +
      '<button class="card-fav' + (fav ? ' active' : '') + '" data-id="' + anime.id + '" title="' + t('navFavorites') + '" aria-label="' + t('navFavorites') + '">' + (fav ? '♥' : '♡') + '</button>' +
      '<img src="' + img + '" alt="' + escapeHtml(title) + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/300x450/1a1f2a/8b93a7?text=No+Image\'">' +
      '<div class="card-info">' +
        '<h3 class="card-title">' + escapeHtml(title) + '</h3>' +
        '<div class="card-meta">' +
          '<span class="score">' + score + '</span>' +
          (format ? '<span class="type-badge">' + format + '</span>' : '') +
        '</div>' +
      '</div>' +
    '</article>';
  }).join('');

  document.querySelectorAll('.anime-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.card-fav')) return;
      openModal(card.dataset.id);
    });
  });

  document.querySelectorAll('.card-fav').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const id = btn.dataset.id;
      const card = btn.closest('.anime-card');
      const titleEl = card.querySelector('.card-title');
      const imgEl = card.querySelector('img');
      const scoreEl = card.querySelector('.score');
      const formatEl = card.querySelector('.type-badge');
      const anime = {
        id: parseInt(id, 10),
        title: { english: titleEl ? titleEl.textContent : '' },
        coverImage: { large: imgEl ? imgEl.src : '' },
        averageScore: scoreEl && scoreEl.textContent !== '—' ? parseFloat(scoreEl.textContent) * 10 : null,
        format: formatEl ? formatEl.textContent : ''
      };
      const nowFav = toggleFavorite(anime);
      btn.classList.toggle('active', nowFav);
      btn.textContent = nowFav ? '♥' : '♡';
      if (state.currentFilter === 'favorites' && !nowFav) {
        renderFavorites();
      }
    });
  });
}

function updatePagination() {
  if (state.currentFilter === 'favorites') {
    elements.pagination.classList.add('hidden');
    return;
  }
  if (state.currentPage <= 1 && !state.hasNextPage) {
    elements.pagination.classList.add('hidden');
    return;
  }
  elements.pagination.classList.remove('hidden');
  elements.pageInfo.textContent = t('page') + ' ' + state.currentPage + (state.totalPages ? ' ' + t('of') + ' ' + state.totalPages : '');
  elements.prevPage.disabled = state.currentPage <= 1;
  elements.nextPage.disabled = !state.hasNextPage;
}

// ——— AniLibria (api.anilibria.tv/v3, через CORS-прокси) ———
// Позволяет найти тайтл на AniLibria по названию и посмотреть серии
// прямо в плеере (HLS/m3u8) через hls.js, без ухода с сайта.
let anilibriaHls = null;

function anilibriaDestroyPlayer() {
  if (anilibriaHls) {
    try { anilibriaHls.destroy(); } catch (e) {}
    anilibriaHls = null;
  }
}

async function anilibriaFetch(path) {
  const targetUrl = ANILIBRIA_API + path;
  const proxiedUrl = ANILIBRIA_CORS_PROXY + encodeURIComponent(targetUrl);
  let res;
  try {
    res = await fetch(proxiedUrl);
  } catch (e) {
    throw new Error(t('anilibriaError'));
  }
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error(t('anilibriaError'));
  }
  if (!res.ok || (json && json.error)) {
    throw new Error((json && json.error && json.error.message) || t('anilibriaError'));
  }
  return json;
}

function anilibriaExtractList(json) {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.data)) return json.data;
  if (json && Array.isArray(json.list)) return json.list;
  if (json && Array.isArray(json.items)) return json.items;
  if (json && Array.isArray(json.releases)) return json.releases;
  if (json && json.id) return [json];
  return [];
}

// Абсолютный URL для картинок/видео: новый API может отдавать как полные
// ссылки, так и относительные пути (тогда достраиваем их от anilibria.top).
function anilibriaAbsUrl(u) {
  if (!u || typeof u !== 'string') return '';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.indexOf('//') === 0) return 'https:' + u;
  if (u.indexOf('/') === 0) return ANILIBRIA_ORIGIN + u;
  return u;
}

function anilibriaName(r) {
  const n = r.name || r.names || {};
  const main = n.main || n.ru || n.russian || r.alias || r.code || ('#' + r.id);
  const sub = n.english || n.en || n.alternative || n.alt || '';
  return { main: main, sub: sub === main ? '' : sub };
}

function anilibriaPosterUrl(release) {
  const p = release.poster || release.posters || {};
  const candidate = p.src || p.url ||
    (p.optimized && (p.optimized.src || p.optimized.preview)) ||
    (p.medium && (p.medium.url || p.medium.src)) ||
    (p.small && (p.small.url || p.small.src)) ||
    (p.original && (p.original.url || p.original.src));
  return candidate ? anilibriaAbsUrl(candidate) : '';
}

function anilibriaTypeStr(release) {
  const type = release.type || {};
  return type.description || type.full_string || type.value || type.string || '';
}

function anilibriaIsBlocked(release) {
  const b = release.blocked;
  if (b && typeof b === 'object') return !!(b.blocked || b.is_blocked);
  return !!(b || release.is_blocked_by_geo);
}

function anilibriaMatchesQuery(release, q) {
  const n = release.name || release.names || {};
  const hay = [n.main, n.ru, n.russian, n.english, n.en, n.alternative, n.alt, release.alias, release.code]
    .filter(Boolean).join(' ').toLowerCase();
  return hay.indexOf(q) !== -1;
}

// Публичной документации/поиска у нового API нет, поэтому ищем перебором
// страниц каталога и фильтруем совпадения на клиенте.
async function anilibriaSearch(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  const pageSize = 50;
  const maxPages = 6;
  const seen = new Set();
  const matches = [];
  for (let page = 1; page <= maxPages; page++) {
    let json;
    try {
      json = await anilibriaFetch('/anime/catalog/releases?limit=' + pageSize + '&page=' + page);
    } catch (err) {
      if (page === 1) throw err;
      break;
    }
    const list = anilibriaExtractList(json);
    if (!list.length) break;
    for (const r of list) {
      if (r.id === undefined || seen.has(r.id)) continue;
      seen.add(r.id);
      if (anilibriaMatchesQuery(r, q)) matches.push(r);
    }
    if (matches.length >= 8 || list.length < pageSize) break;
  }
  return matches.slice(0, 8);
}

function anilibriaManualLinkHtml() {
  return '<p style="margin-top:10px"><a class="mal-btn" href="https://anilibria.top/" target="_blank" rel="noopener">AniLibria.top →</a></p>';
}

async function anilibriaRunSearch(container, query) {
  container.innerHTML = '<div class="anilibria-status"><div class="spinner" style="margin:0 auto 10px"></div>' + t('anilibriaSearching') + '</div>';
  try {
    const results = await anilibriaSearch(query);
    if (!results.length) {
      container.innerHTML = '<div class="anilibria-status">' + escapeHtml(t('anilibriaNotFound')) + anilibriaManualLinkHtml() + '</div>';
      return;
    }
    anilibriaRenderResults(container, results);
  } catch (err) {
    container.innerHTML = '<div class="anilibria-status">' + escapeHtml(err.message || t('anilibriaError')) + anilibriaManualLinkHtml() + '</div>';
  }
}

function anilibriaRenderResults(container, results) {
  anilibriaDestroyPlayer();
  const cards = results.map(function(r, idx) {
    const name = anilibriaName(r);
    const poster = anilibriaPosterUrl(r);
    const typeStr = anilibriaTypeStr(r);
    return '<div class="anilibria-result-card" data-idx="' + idx + '">' +
      (poster ? '<img src="' + poster + '" alt="" loading="lazy">' : '<div class="anilibria-result-noimg">?</div>') +
      '<div class="anilibria-result-info">' +
        '<div class="anilibria-result-title">' + escapeHtml(name.main) + '</div>' +
        (name.sub ? '<div class="anilibria-result-sub">' + escapeHtml(name.sub) + '</div>' : '') +
        (typeStr ? '<div class="anilibria-result-sub">' + escapeHtml(typeStr) + '</div>' : '') +
      '</div>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<p class="anilibria-hint">' + escapeHtml(t('anilibriaChoose')) + '</p>' +
    '<div class="anilibria-results">' + cards + '</div>';

  container.querySelectorAll('.anilibria-result-card').forEach(function(card) {
    card.addEventListener('click', function() {
      anilibriaRenderPlayer(container, results[parseInt(card.dataset.idx, 10)], results);
    });
  });
}

function anilibriaEpisodesList(release) {
  const raw = release.episodes || release.list ||
    (release.player && release.player.list) || release.player_episodes || [];
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') {
    return Object.keys(raw)
      .sort(function(a, b) { return parseFloat(a) - parseFloat(b); })
      .map(function(k) { return raw[k]; });
  }
  return [];
}

function anilibriaEpisodeHls(ep) {
  const candidates = [
    ep.hls_1080, ep.hls1080,
    ep.hls_720, ep.hls720,
    ep.hls_480, ep.hls480,
    ep.hls && (ep.hls.fhd || ep.hls['1080'] || ep.hls.hd || ep.hls['720'] || ep.hls.sd || ep.hls['480']),
    ep.hls_fhd, ep.hls_hd, ep.hls_sd
  ];
  for (const c of candidates) {
    if (c && typeof c === 'string') return anilibriaAbsUrl(c);
  }
  return '';
}

function anilibriaEpisodeLabel(ep, idx) {
  if (ep.name) return ep.name;
  if (ep.name_english) return ep.name_english;
  if (ep.ordinal !== undefined && ep.ordinal !== null) return t('anilibriaEpisodes') + ' ' + ep.ordinal;
  return t('anilibriaEpisodes') + ' ' + (idx + 1);
}

async function anilibriaRenderPlayer(container, releaseSummary, allResults) {
  anilibriaDestroyPlayer();
  const name = anilibriaName(releaseSummary);
  container.innerHTML =
    '<button type="button" class="anilibria-back-btn" id="anilibriaBackBtn">' + escapeHtml(t('anilibriaBack')) + '</button>' +
    '<h4 class="anilibria-player-title">' + escapeHtml(name.main) + '</h4>' +
    '<div class="anilibria-status"><div class="spinner" style="margin:0 auto 10px"></div>' + t('anilibriaSearching') + '</div>';

  const backBtn = document.getElementById('anilibriaBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      anilibriaRenderResults(container, allResults);
    });
  }

  let full = releaseSummary;
  try {
    if (releaseSummary.id !== undefined) {
      const detail = await anilibriaFetch('/anime/releases/' + releaseSummary.id);
      if (detail && (detail.id !== undefined || detail.data)) full = detail.data || detail;
    }
  } catch (err) {
    // остаёмся на кратких данных из поиска — может, эпизоды там уже были
  }

  const episodes = anilibriaEpisodesList(full).length ? anilibriaEpisodesList(full) : anilibriaEpisodesList(releaseSummary);
  const blockedNotice = anilibriaIsBlocked(full)
    ? '<p class="anilibria-blocked">' + escapeHtml(t('anilibriaBlocked')) + '</p>' : '';

  let episodesHtml;
  if (!episodes.length) {
    episodesHtml = '<p class="anilibria-hint">' + escapeHtml(t('anilibriaNoEpisodes')) + anilibriaManualLinkHtml() + '</p>';
  } else {
    episodesHtml = '<div class="anilibria-episodes">' + episodes.map(function(ep, i) {
      const label = anilibriaEpisodeLabel(ep, i);
      return '<button type="button" class="anilibria-ep-btn' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">' + escapeHtml(String(label)) + '</button>';
    }).join('') + '</div>';
  }

  container.innerHTML =
    '<button type="button" class="anilibria-back-btn" id="anilibriaBackBtn2">' + escapeHtml(t('anilibriaBack')) + '</button>' +
    '<h4 class="anilibria-player-title">' + escapeHtml(name.main) + '</h4>' +
    blockedNotice +
    '<div class="anilibria-video-wrap"><video id="anilibriaVideo" controls playsinline></video></div>' +
    episodesHtml;

  const backBtn2 = document.getElementById('anilibriaBackBtn2');
  if (backBtn2) {
    backBtn2.addEventListener('click', function() {
      anilibriaRenderResults(container, allResults);
    });
  }

  function playEpisode(idx) {
    const ep = episodes[idx];
    const src = ep && anilibriaEpisodeHls(ep);
    const video = document.getElementById('anilibriaVideo');
    if (!ep || !src || !video) {
      if (video) {
        const msg = document.createElement('p');
        msg.className = 'anilibria-hint';
        msg.textContent = t('anilibriaNoEpisodes');
        video.replaceWith(msg);
      }
      return;
    }
    anilibriaDestroyPlayer();
    if (window.Hls && window.Hls.isSupported()) {
      anilibriaHls = new window.Hls();
      anilibriaHls.loadSource(src);
      anilibriaHls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
    video.play().catch(function() {});
  }

  container.querySelectorAll('.anilibria-ep-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      container.querySelectorAll('.anilibria-ep-btn').forEach(function(b) { b.classList.toggle('active', b === btn); });
      playEpisode(parseInt(btn.dataset.idx, 10));
    });
  });

  if (episodes.length) playEpisode(0);
}

// ——— Modal ———
async function openModal(id) {
  bumpStat('modals');
  elements.modal.classList.remove('hidden');
  elements.modalBody.innerHTML = '<div style="grid-column:1/-1;padding:60px;text-align:center"><div class="spinner" style="margin:0 auto 16px"></div><p>' + t('loading') + '</p></div>';

  try {
    const data = await gql(DETAIL_QUERY, { id: parseInt(id, 10) });
    const anime = data.Media;
    if (!anime) throw new Error(state.lang === 'en' ? 'Not found' : 'Не найдено');

    const img = (anime.coverImage && (anime.coverImage.extraLarge || anime.coverImage.large)) || '';
    const title = formatTitle(anime);
    const native = (anime.title && anime.title.native) || '';
    const score = anime.averageScore ? (anime.averageScore / 10).toFixed(2) : '—';
    const episodes = anime.episodes || '?';
    const statusMap = {
      FINISHED: t('statusFinished'),
      RELEASING: t('statusReleasing'),
      NOT_YET_RELEASED: t('statusNotYet'),
      CANCELLED: t('statusCancelled'),
      HIATUS: t('statusHiatus')
    };
    const status = statusMap[anime.status] || anime.status || '—';
    const year = anime.seasonYear || '—';
    const season = seasonLabel(anime.season);
    const genres = (anime.genres || []).map(function(g) { return '<span class="genre-tag">' + escapeHtml(g) + '</span>'; }).join('');
    const synopsis = stripHtml(anime.description) || t('noDescription');
    const studios = (anime.studios && anime.studios.nodes || [])
      .filter(function(s) { return s.isAnimationStudio; })
      .map(function(s) { return s.name; }).join(', ') || '—';
    const fav = isFavorite(anime.id);

    addToWatched(anime);
    if (!elements.profileModal.classList.contains('hidden')) renderLibraryTab();

    const watchHtml = '<button class="watch-btn" id="modalWatchBtn" type="button">' + t('watch') + '</button>';
    const watchQuery = encodeURIComponent(title + ' anime');
    const watchBoxHtml =
      '<div class="watch-box hidden" id="watchBox">' +
        '<div class="watch-tabs">' +
          '<button type="button" class="watch-tab active" data-watch="anilibria">' + t('watchOnAnilibria') + '</button>' +
          '<button type="button" class="watch-tab" data-watch="youtube">' + t('watchOnYoutube') + '</button>' +
        '</div>' +
        '<div class="watch-panel active" id="watchPanelAnilibria"><div class="anilibria-box" id="anilibriaBox"></div></div>' +
        '<div class="watch-panel" id="watchPanelYoutube"><div class="watch-frame-wrap" id="watchFrameYoutube"></div></div>' +
      '</div>';

    let trailerHtml = '';
    if (anime.trailer && anime.trailer.id && anime.trailer.site === 'youtube') {
      trailerHtml = '<div class="trailer-container" id="trailerBox"><iframe src="https://www.youtube.com/embed/' + anime.trailer.id + '" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>';
    }

    const commentsHtml = renderCommentsSectionHtml();

    const recs = (anime.recommendations && anime.recommendations.nodes || [])
      .map(function(n) { return n.mediaRecommendation; })
      .filter(Boolean);

    const relations = (anime.relations && anime.relations.edges || [])
      .filter(function(e) { return e.node && e.node.type === 'ANIME'; })
      .slice(0, 6);

    let recsHtml = '';
    if (recs.length || relations.length) {
      recsHtml = '<div class="recs-section">';
      if (relations.length) {
        recsHtml += '<h3>' + t('related') + '</h3><div class="recs-grid">' +
          relations.map(function(e) {
            const m = e.node;
            const ttitle = (m.title && (m.title.english || m.title.romaji)) || '';
            const c = (m.coverImage && m.coverImage.medium) || '';
            return '<div class="rec-card" data-id="' + m.id + '"><img src="' + c + '" alt=""><div class="rec-title">' + escapeHtml(e.relationType) + ': ' + escapeHtml(ttitle) + '</div></div>';
          }).join('') + '</div>';
      }
      if (recs.length) {
        recsHtml += '<h3 style="margin-top:20px">' + t('recommendations') + '</h3><div class="recs-grid">' +
          recs.map(function(m) {
            const ttitle = (m.title && (m.title.english || m.title.romaji)) || '';
            const c = (m.coverImage && (m.coverImage.large || m.coverImage.medium)) || '';
            return '<div class="rec-card" data-id="' + m.id + '"><img src="' + c + '" alt=""><div class="rec-title">' + escapeHtml(ttitle) + '</div></div>';
          }).join('') + '</div>';
      }
      recsHtml += '</div>';
    }

    elements.modalBody.innerHTML =
      '<div class="modal-poster"><img src="' + img + '" alt="' + escapeHtml(title) + '" onerror="this.src=\'https://via.placeholder.com/300x450/1a1f2a/8b93a7?text=No+Image\'"></div>' +
      '<div class="modal-details">' +
        '<h2>' + escapeHtml(title) + '</h2>' +
        (native ? '<p class="japanese">' + escapeHtml(native) + '</p>' : '') +
        '<div class="modal-stats">' +
          '<div class="stat">★ <strong>' + score + '</strong></div>' +
          '<div class="stat">' + t('episodes') + ' <strong>' + episodes + '</strong></div>' +
          '<div class="stat">' + escapeHtml(status) + '</div>' +
          '<div class="stat">' + (season ? season + ' ' : '') + year + '</div>' +
          '<div class="stat">' + escapeHtml(anime.format || '') + '</div>' +
        '</div>' +
        '<div class="modal-genres">' + genres + '</div>' +
        '<p class="modal-synopsis" style="margin-bottom:12px"><strong>' + t('studioLabel') + ':</strong> ' + escapeHtml(studios) + '</p>' +
        '<p class="modal-synopsis">' + escapeHtml(synopsis).replace(/\n/g, '<br>') + '</p>' +
        trailerHtml +
        '<div style="margin-top:20px">' +
          '<button class="fav-btn' + (fav ? ' active' : '') + '" id="modalFavBtn">' + (fav ? t('inFavorites') : t('addFavorite')) + '</button>' +
          watchHtml +
          '<a href="' + anime.siteUrl + '" target="_blank" rel="noopener" class="mal-btn">AniList →</a>' +
        '</div>' +
        watchBoxHtml +
        commentsHtml +
      '</div>' +
      recsHtml;

    document.getElementById('modalFavBtn').addEventListener('click', function() {
      const nowFav = toggleFavorite(anime);
      this.classList.toggle('active', nowFav);
      this.textContent = nowFav ? t('inFavorites') : t('addFavorite');
      const cardBtn = document.querySelector('.card-fav[data-id="' + anime.id + '"]');
      if (cardBtn) {
        cardBtn.classList.toggle('active', nowFav);
        cardBtn.textContent = nowFav ? '♥' : '♡';
      }
      if (state.currentFilter === 'favorites') renderFavorites();
    });

    const modalWatchBtn = document.getElementById('modalWatchBtn');
    if (modalWatchBtn) {
      modalWatchBtn.addEventListener('click', function() {
        const box = document.getElementById('watchBox');
        if (!box) return;
        const willOpen = box.classList.contains('hidden');
        box.classList.toggle('hidden');
        this.classList.toggle('active', willOpen);
        if (willOpen) {
          const anilibriaBox = document.getElementById('anilibriaBox');
          if (anilibriaBox && !anilibriaBox.dataset.loaded) {
            anilibriaBox.dataset.loaded = '1';
            anilibriaRunSearch(anilibriaBox, title);
          }
          box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    document.querySelectorAll('.watch-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        const kind = tab.dataset.watch;
        document.querySelectorAll('.watch-tab').forEach(function(tb) { tb.classList.toggle('active', tb === tab); });
        const py = document.getElementById('watchPanelYoutube');
        const pa = document.getElementById('watchPanelAnilibria');
        if (py) py.classList.toggle('active', kind === 'youtube');
        if (pa) pa.classList.toggle('active', kind === 'anilibria');
        if (kind === 'anilibria') {
          const box = document.getElementById('anilibriaBox');
          if (box && !box.dataset.loaded) {
            box.dataset.loaded = '1';
            anilibriaRunSearch(box, title);
          }
        } else if (kind === 'youtube') {
          anilibriaDestroyPlayer();
          const video = document.getElementById('anilibriaVideo');
          if (video) video.pause();
          const frameWrap = document.getElementById('watchFrameYoutube');
          if (frameWrap && !frameWrap.querySelector('iframe')) {
            frameWrap.innerHTML = '<iframe src="https://www.youtube.com/embed?listType=search&list=' + watchQuery +
              '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
          }
        }
      });
    });

    document.querySelectorAll('.rec-card').forEach(function(c) {
      c.addEventListener('click', function() {
        openModal(c.dataset.id);
      });
    });

    attachCommentsHandlers(anime.id);
  } catch (err) {
    elements.modalBody.innerHTML = '<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--danger)">' + escapeHtml(err.message) + '</div>';
  }
}

function closeModal() {
  anilibriaDestroyPlayer();
  stopCommentsPolling();
  elements.modal.classList.add('hidden');
  elements.modalBody.innerHTML = '';
}

// ——— Events ———
elements.navBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    if (state.isLoading) return;
    elements.navBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    state.searchQuery = '';
    elements.searchInput.value = '';
    state.currentPage = 1;
    loadAnime(1);
  });
});

elements.searchBtn.addEventListener('click', doSearch);
elements.searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });

function doSearch() {
  var q = elements.searchInput.value.trim();
  if (!q || state.isLoading) return;
  bumpStat('searches');
  state.searchQuery = q;
  state.currentPage = 1;
  elements.navBtns.forEach(function(b) { b.classList.remove('active'); });
  state.currentFilter = 'top';
  loadAnime(1);
}

elements.applyFilters.addEventListener('click', function() {
  state.genre = elements.genreSelect.value;
  state.season = elements.seasonSelect.value;
  state.year = elements.yearSelect.value;
  state.studio = elements.studioInput.value.trim();
  state.sort = elements.sortSelect.value;
  state.currentPage = 1;
  if (state.currentFilter === 'favorites') {
    state.currentFilter = 'top';
    elements.navBtns.forEach(function(b) { b.classList.toggle('active', b.dataset.filter === 'top'); });
  }
  loadAnime(1);
});

// Сортировка применяется сразу при выборе, не дожидаясь кнопки "Применить"
elements.sortSelect.addEventListener('change', function() {
  if (state.isLoading) return;
  state.sort = elements.sortSelect.value;
  state.currentPage = 1;
  if (state.currentFilter === 'favorites') {
    state.currentFilter = 'top';
    elements.navBtns.forEach(function(b) { b.classList.toggle('active', b.dataset.filter === 'top'); });
  }
  loadAnime(1);
});

elements.resetFilters.addEventListener('click', function() {
  elements.genreSelect.value = '';
  elements.seasonSelect.value = '';
  elements.yearSelect.value = '';
  elements.studioInput.value = '';
  elements.sortSelect.value = 'SCORE_DESC';
  state.genre = '';
  state.season = '';
  state.year = '';
  state.studio = '';
  state.sort = 'SCORE_DESC';
  state.currentPage = 1;
  loadAnime(1);
});

elements.prevPage.addEventListener('click', function() {
  if (state.currentPage > 1 && !state.isLoading) loadAnime(state.currentPage - 1);
});
elements.nextPage.addEventListener('click', function() {
  if (state.hasNextPage && !state.isLoading) loadAnime(state.currentPage + 1);
});

elements.modalClose.addEventListener('click', closeModal);
elements.modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeAuthModal();
    closeSettingsModal();
    closeProfileModal();
  }
});

// Клики по логотипу AnimeRoom для бейджа «Сверхскоростной режим»
var logoClickTimes = [];

elements.logo.addEventListener('click', function(e) {
  e.preventDefault();

  var now = Date.now();
  logoClickTimes.push(now);
  // оставляем только клики за последние 20 секунд
  logoClickTimes = logoClickTimes.filter(function(t) { return now - t <= 20000; });
  if (logoClickTimes.length >= 15) {
    var stats = loadStats();
    if (!stats.speedMode) {
      stats.speedMode = 1;
      saveStats(stats);
      checkBadges();
    }
    logoClickTimes = [];
  }

  state.searchQuery = '';
  elements.searchInput.value = '';
  state.genre = state.season = state.year = state.studio = '';
  state.sort = 'SCORE_DESC';
  elements.genreSelect.value = '';
  elements.seasonSelect.value = '';
  elements.yearSelect.value = '';
  elements.studioInput.value = '';
  elements.sortSelect.value = 'SCORE_DESC';
  state.currentFilter = 'top';
  elements.navBtns.forEach(function(b) { b.classList.toggle('active', b.dataset.filter === 'top'); });
  loadAnime(1);
});

// Auth events
elements.authBtn.addEventListener('click', openAuthModal);
elements.authClose.addEventListener('click', closeAuthModal);
elements.authBackdrop.addEventListener('click', closeAuthModal);

elements.authTabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    state.authTab = tab.dataset.tab;
    elements.authTabs.forEach(function(t) { t.classList.toggle('active', t.dataset.tab === state.authTab); });
    elements.authForm.querySelector('.auth-submit').textContent = state.authTab === 'register' ? t('register') : t('login');
    elements.authError.classList.add('hidden');
  });
});

elements.authForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const nick = elements.authNick.value.trim();
  const pass = elements.authPass.value;
  elements.authError.classList.add('hidden');

  if (!nick || !pass) {
    elements.authError.textContent = t('authErrorEmpty');
    elements.authError.classList.remove('hidden');
    return;
  }
  if (nick.length < 2 || pass.length < 4) {
    elements.authError.textContent = t('authErrorShort');
    elements.authError.classList.remove('hidden');
    return;
  }

  const users = loadUsers();
  if (state.authTab === 'register') {
    if (users[nick.toLowerCase()]) {
      elements.authError.textContent = t('authErrorExists');
      elements.authError.classList.remove('hidden');
      return;
    }
    users[nick.toLowerCase()] = { nick: nick, pass: pass };
    saveUsers(users);
    setCurrentUser({ nick: nick, pass: pass });
    closeAuthModal();
  } else {
    const u = users[nick.toLowerCase()];
    if (!u || u.pass !== pass) {
      elements.authError.textContent = t('authErrorWrong');
      elements.authError.classList.remove('hidden');
      return;
    }
    setCurrentUser({ nick: u.nick, pass: u.pass });
    closeAuthModal();
  }
});

// Title picker
if (elements.profileTitleRow) {
  elements.profileTitleRow.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleTitleMenu();
  });
}
if (elements.profileNickRow) {
  elements.profileNickRow.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleTitleMenu();
  });
}
document.addEventListener('click', function(e) {
  if (!elements.titleMenu || elements.titleMenu.classList.contains('hidden')) return;
  if (e.target.closest('#profileTitleRow') || e.target.closest('#profileNickRow') || e.target.closest('#titleMenu')) return;
  elements.titleMenu.classList.add('hidden');
});

// Settings events
document.querySelectorAll('.settings-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    const id = tab.dataset.stab;
    document.querySelectorAll('.settings-tab').forEach(function(t) {
      t.classList.toggle('active', t.dataset.stab === id);
    });
    document.querySelectorAll('.settings-panel').forEach(function(p) {
      p.classList.toggle('active', p.id === 'panel-' + id);
    });
    if (id === 'theme') drawColorWheel();
  });
});

elements.settingsBtn.addEventListener('click', openSettingsModal);
elements.settingsClose.addEventListener('click', closeSettingsModal);
elements.settingsBackdrop.addEventListener('click', closeSettingsModal);

// Profile events
elements.profileBtn.addEventListener('click', openProfileModal);
elements.profileClose.addEventListener('click', closeProfileModal);
elements.profileBackdrop.addEventListener('click', closeProfileModal);

// Avatar upload
if (elements.avatarBtn && elements.avatarInput) {
  elements.avatarBtn.addEventListener('click', function() {
    elements.avatarInput.click();
  });
  elements.avatarInput.addEventListener('change', function() {
    const file = elements.avatarInput.files && elements.avatarInput.files[0];
    handleAvatarFile(file);
    elements.avatarInput.value = '';
  });
}

elements.logoutBtn.addEventListener('click', function() {
  setCurrentUser(null);
  closeProfileModal();
});

// Color wheel
let wheelDragging = false;
elements.colorWheel.addEventListener('mousedown', function(e) {
  wheelDragging = true;
  pickColorFromWheel(e);
});
elements.colorWheel.addEventListener('mousemove', function(e) {
  if (wheelDragging) pickColorFromWheel(e);
});
document.addEventListener('mouseup', function() { wheelDragging = false; });
elements.colorWheel.addEventListener('touchstart', function(e) {
  e.preventDefault();
  wheelDragging = true;
  pickColorFromWheel(e);
}, { passive: false });
elements.colorWheel.addEventListener('touchmove', function(e) {
  e.preventDefault();
  if (wheelDragging) pickColorFromWheel(e);
}, { passive: false });
document.addEventListener('touchend', function() { wheelDragging = false; });

document.querySelectorAll('.preset-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    applyThemeColor(btn.dataset.color, true);
  });
});

// Language
elements.langBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    applyLanguage(btn.dataset.lang);
  });
});

// Init
updateFavCount();
state.user = loadCurrentUser();
updateAuthUI();
applyThemeColor(state.themeColor);
applyThemePattern(state.themePattern, false);
applyLanguage(state.lang);
startTimeTracking();
checkBadges();

(async function() {
  await initFilters();
  loadAnime(1);
})();
