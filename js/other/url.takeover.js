jQuery(function($) {
  function parse(search_str) {
    if (!search_str) { return Object.create(null); }

    return search_str.slice(1).split('&').reduce(function(obj, v) {
      var pair = v.split('=');
      obj[pair[0]] = decodeURIComponent(pair[1]);
      return obj;
    }, Object.create(null));
  }

  function stringify(search) {
    var search_str = Object.keys(search).map(function(key) {
      return key + '=' + encodeURIComponent(search[key]);
    }).join('&');

    return '?' + search_str;
  }

  var $links = $('a[href*="/contact/"], a[href*="/reserve/"]');

  $links.each(function() {
    var link = this;

    var search = parse(link.search);
    search.from = location.href;
    link.search = stringify(search);
  });
});
