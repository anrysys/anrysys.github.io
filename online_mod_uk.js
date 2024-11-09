(function () {
  'use strict';

  function startsWith(str, searchString) {
    return str.lastIndexOf(searchString, 0) === 0;
  }

  function endsWith(str, searchString) {
    var start = str.length - searchString.length;
    if (start < 0) return false;
    return str.indexOf(searchString, start) === start;
  }

  var myIp = '';

  function decodeSecret(input) {
    var result = '';
    var password = Lampa.Storage.get('online_mod_secret_password', '') + '';

    if (input && password) {
      var hash = Lampa.Utils.hash(password);

      while (hash.length < input.length) {
        hash += hash;
      }

      var i = 0;

      while (i < input.length) {
        result += String.fromCharCode(input[i] ^ hash.charCodeAt(i));
        i++;
      }
    }

    return result;
  }

  function isDebug() {
    var secret = decodeSecret([92, 85, 91, 65, 84]);
    return secret === 'debug';
  }

  function rezka2Mirror() {
    var url = Lampa.Storage.get('online_mod_rezka2_mirror', '') + '';
    if (!url) return 'https://hdrezka.la';
    if (url.indexOf('://') == -1) url = 'https://' + url;
    if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length - 1);
    return url;
  }

  function kinobaseMirror() {
    var url = Lampa.Storage.get('online_mod_kinobase_mirror', '') + '';
    if (!url) return 'https://kinobase.org';
    if (url.indexOf('://') == -1) url = 'https://' + url;
    if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length - 1);
    return url;
  }

  function loadOnline(object) {
    // ...existing code...
  }

  function rezka2FillCookie(success, error) {
    var prox = 'https://ukrainian-proxy.com/';
    network.silent(prox + url, function (json) {
      // ...existing code...
    }, function (a, c) {
      Lampa.Noty.show(network.errorDecode(a, c));
      if (error) error();
    }, postdata);
  }

  function rezka2Logout(success, error) {
    var url = Utils.rezka2Mirror() + '/logout/';
    network.clear();
    network.timeout(8000);
    network.silent(url, function (str) {
      Lampa.Storage.set("online_mod_rezka2_status", 'false');
      if (success) success();
    }, function (a, c) {
      Lampa.Storage.set("online_mod_rezka2_status", 'false');
      Lampa.Noty.show(network.errorDecode(a, c));
      if (error) error();
    }, false, {
      dataType: 'text',
      withCredentials: true
    });
  }

  var template = "<div>";

  template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka2\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} HDrezka</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

  if (Utils.isDebug()) {
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kinobase\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kinobase</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_cdnmovies\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} CDNMovies</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
  }

  template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fancdn\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanCDN</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

  if (Utils.isDebug()) {
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_redheadsound\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} RedHeadSound</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
  }

  template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_anilibria\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AniLibria</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kodik\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kodik</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_skip_kp_search\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_skip_kp_search}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_iframe_proxy\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_iframe_proxy}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_prefer_http\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_prefer_http}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_prefer_mp4\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_prefer_mp4}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_prefer_dash\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_prefer_dash}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_save_last_balanser\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_save_last_balanser}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_clear_last_balanser\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_clear_last_balanser}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>";

  {
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_fix_stream\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_fix_stream}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
  }

  template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_use_stream_proxy\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_use_stream_proxy}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_find_ip\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_find_ip}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other_url\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other_url}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_secret_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_secret_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

  if (Utils.isDebug()) {
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_av1_support\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_av1_support}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
  }

  template += "\n</div>";
  Lampa.Template.add('settings_online_mod', template);

  function addSettingsOnlineMod() {
    if (Lampa.Settings.main && Lampa.Settings.main() && !Lampa.Settings.main().render().find('[data-component="online_mod"]').length) {
      var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"online_mod\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"260\" viewBox=\"0 0 244 260\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M242,88v170H10V88h41l-38,38h37.1l38-38h38.4l-38,38h38.4l38-38h38.3l-38,38H204L242,88L242,88z M228.9,2l8,37.7l0,0 L191.2,10L228.9,2z M160.6,56l-45.8-29.7l38-8.1l45.8,29.7L160.6,56z M84.5,72.1L38.8,42.4l38-8.1l45.8,29.7L84.5,72.1z M10,88 L2,50.2L47.8,80L10,88z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">#{online_mod_title_full}</div>\n        </div>"));
      Lampa.Settings.main().render().find('[data-component="more"]').after(field);
      Lampa.Settings.main().update();
    }
  }

  if (window.appready) addSettingsOnlineMod();else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type == 'ready') addSettingsOnlineMod();
    });
  }
  Lampa.Settings.listener.follow('open', function (e) {
    if (e.name == 'online_mod') {
      var clear_last_balanser = e.body.find('[data-name="online_mod_clear_last_balanser"]');
      clear_last_balanser.unbind('hover:enter').on('hover:enter', function () {
        Lampa.Storage.set('online_last_balanser', {});
        Lampa.Storage.set('online_balanser', '');
        Lampa.Storage.set('online_mod_last_balanser', {});
        Lampa.Storage.set('online_mod_balanser', '');
        $('.settings-param__status', clear_last_balanser).removeClass('active error wait').addClass('active');
      });
      var rezka2_login = e.body.find('[data-name="online_mod_rezka2_login"]');
      rezka2_login.unbind('hover:enter').on('hover:enter', function () {
        var rezka2_login_status = $('.settings-param__status', rezka2_login).removeClass('active error wait').addClass('wait');
        rezka2Login(function () {
          rezka2_login_status.removeClass('active error wait').addClass('active');
        }, function () {
          rezka2_login_status.removeClass('active error wait').addClass('error');
        });
      });
      var rezka2_logout = e.body.find('[data-name="online_mod_rezka2_logout"]');
      rezka2_logout.unbind('hover:enter').on('hover:enter', function () {
        var rezka2_logout_status = $('.settings-param__status', rezka2_logout).removeClass('active error wait').addClass('wait');
        rezka2Logout(function () {
          rezka2_logout_status.removeClass('active error wait').addClass('active');
        }, function () {
          rezka2_logout_status.removeClass('active error wait').addClass('error');
        });
      });
      var rezka2_fill_cookie = e.body.find('[data-name="online_mod_rezka2_fill_cookie"]');
      rezka2_fill_cookie.unbind('hover:enter').on('hover:enter', function () {
        var rezka2_fill_cookie_status = $('.settings-param__status', rezka2_fill_cookie).removeClass('active error wait').addClass('wait');
        rezka2FillCookie(function () {
          rezka2_fill_cookie_status.removeClass('active error wait').addClass('active');
          Lampa.Params.update(e.body.find('[data-name="online_mod_rezka2_cookie"]'), [], e.body);
        }, function () {
          rezka2_fill_cookie_status.removeClass('active error wait').addClass('error');
        });
      });
    }
  });

})();
