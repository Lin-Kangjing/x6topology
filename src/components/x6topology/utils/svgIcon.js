/*
 * @Description:svg图标
 * @FilePath: \x6topology\src\components\x6topology\utils\svgIcon.js
 * @Date: 2022-01-18 14:39:03
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-18 14:39:03
 * @author: Lin_kangjing
 */
!(function (e) {
  var t,
    n,
    d,
    o,
    i,
    a,
    r =
      '<svg><symbol id="text-italic" viewBox="0 0 48 48" fill="none"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="#333" d="M20 6h16M12 42h16m1-36.048L19 42" data-follow-stroke="#333"/></symbol><symbol id="strikethrough" viewBox="0 0 48 48" fill="none"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="#333" d="M5 24h38m-19 0c16 6 10 20 0 20s-12-8-12-8m24-24s-3-8-12-8-12.564 7.6-8.39 14" data-follow-stroke="#333"/><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="#333" d="M12 36s4 8 12 8 12.564-7.6 8.39-14" data-follow-stroke="#333"/></symbol><symbol id="text-bold" viewBox="0 0 48 48" fill="none"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="#333" d="M24 24c5.506 0 9.969-4.477 9.969-10S29.506 4 24 4H11v20h13zm4.031 20C33.537 44 38 39.523 38 34s-4.463-10-9.969-10H11v20h17.031z" clip-rule="evenodd" data-follow-stroke="#333"/></symbol><symbol id="text-underline" viewBox="0 0 48 48" fill="none"><path fill-opacity=".01" fill="#fff" d="M0 0h48v48H0z" data-follow-fill="#fff"/><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="#333" d="M8 44h32" data-follow-stroke="#333"/><path stroke-linecap="round" stroke-width="4" stroke="#333" d="M37 6.097V22c0 7.18-5.82 13-13 13s-13-5.82-13-13V6.097" data-follow-stroke="#333"/></symbol></svg>';
  function c() {
    i || ((i = !0), d());
  }
  (t = function () {
    var e, t, n;
    ((n = document.createElement("div")).innerHTML = r),
      (r = null),
      (t = n.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (e = t),
        (n = document.body).firstChild
          ? (t = n.firstChild).parentNode.insertBefore(e, t)
          : n.appendChild(e));
  }),
    document.addEventListener
      ? ["complete", "loaded", "interactive"].indexOf(document.readyState) > -1
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener("DOMContentLoaded", n, !1), t();
          }),
          document.addEventListener("DOMContentLoaded", n, !1))
      : document.attachEvent &&
        ((d = t),
        (o = e.document),
        (i = !1),
        (a = function () {
          try {
            o.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(a, 50);
          }
          c();
        })(),
        (o.onreadystatechange = function () {
          "complete" == o.readyState && ((o.onreadystatechange = null), c());
        }));
})(window);
