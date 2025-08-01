const urlRef = document.getElementById("url_ref");

function genUrl() {
  var url = window.location.href.split("r=")[1];
  return url;
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
} else {
  window.location.href = genUrl();
}

urlRef.addEventListener("click", function () {
  setCookie("coo_load_c324", "1", { secure: true, "max-age": 3600 });
  fbq("trackCustom", "ClickOffer");
  window.location.href = genUrl();
});
