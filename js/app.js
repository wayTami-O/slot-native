const urlRef = document.getElementById("url_ref");

function genUrl() {
  // Пробуем получить URL из параметра r, если нет - используем buildRedirectUrl
  var url = window.location.href.split("r=")[1];
  if (url) {
    return url;
  } else {
    return buildRedirectUrl();
  }
}

// Функция для получения всех query параметров
function getAllUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

// Функция для получения конкретного параметра
function getUrlParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

// Функция для получения параметров с рефереpa (если доступен)
function getReferrerParams() {
  try {
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      const params = {};
      for (const [key, value] of referrerUrl.searchParams) {
        params[key] = value;
      }
      return {
        referrer: document.referrer,
        domain: referrerUrl.hostname,
        params: params
      };
    }
  } catch (e) {
    console.log('Не удалось получить параметры реферера:', e);
  }
  return null;
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // additional
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (getCookie("coo_load_c324") === undefined) {
  // Первый визит - показываем параметры для отладки
  console.log('Текущие URL параметры:', getAllUrlParams());
  console.log('Параметры реферера:', getReferrerParams());
} else {
  window.location.href = genUrl();
}
// Функция для создания ссылки с query параметрами
function buildRedirectUrl() {
  const baseUrl = 'https://blazebet777.com/signUp';
  const params = new URLSearchParams();
  
  // Базовые параметры
  params.set('v1', 'fbintv_8');
  params.set('v4', 'bonanza');
  
  // Получаем subid из текущего URL или реферера
  const currentParams = getAllUrlParams();
  const referrerInfo = getReferrerParams();
  
  // Подставляем subid
  if (currentParams.subid) {
    params.set('v2', currentParams.subid);
  } else if (referrerInfo && referrerInfo.params.subid) {
    params.set('v2', referrerInfo.params.subid);
  } else {
    params.set('v2', '{subid}'); // fallback если subid не найден
  }
  
  // Добавляем дополнительные UTM параметры если есть
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  utmParams.forEach(param => {
    if (currentParams[param]) {
      params.set(param, currentParams[param]);
    } else if (referrerInfo && referrerInfo.params[param]) {
      params.set(param, referrerInfo.params[param]);
    }
  });
  
  // Добавляем другие полезные параметры
  if (currentParams.clickid) params.set('clickid', currentParams.clickid);
  if (currentParams.gclid) params.set('gclid', currentParams.gclid);
  if (currentParams.fbclid) params.set('fbclid', currentParams.fbclid);
  
  const finalUrl = `${baseUrl}?${params.toString()}`;
  console.log('Построенная ссылка:', finalUrl);
  return finalUrl;
}

// Пример использования функций получения параметров
// function logAllParams() {
//   console.log('=== ИНФОРМАЦИЯ О ПАРАМЕТРАХ ===');
//   console.log('Все текущие URL параметры:', getAllUrlParams());
//   console.log('Параметр subid:', getUrlParam('subid'));
//   console.log('Параметр utm_source:', getUrlParam('utm_source'));
//   console.log('Информация о рефереере:', getReferrerParams());
//   console.log('Финальная ссылка для редиректа:', buildRedirectUrl());
// }

// Вызываем при загрузке страницы
// logAllParams();

if (urlRef) {
  urlRef.addEventListener("click", function () {
    setCookie("coo_load_c324", "1", { secure: true, "max-age": 3600 });
    fbq("trackCustom", "ClickOffer");
    window.location.href = genUrl();
  });
}
