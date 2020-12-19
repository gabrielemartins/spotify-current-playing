(function () {
  $(document).ready(function () {
    $(".container-song").hide();
  });

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var params = getHashParams();

  var access_token = params.access_token,
    error = params.error;

  if (error) {
    alert("There was an error during the authentication");
  } else {
    setInterval(function () {
      $.ajax({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: "Bearer " + access_token,
        },
        success: function (response) {
          $(".container").hide();
          $(".container-song").show();
          let singers = response.item.artists;
          let singer = singers.map(function (item, indice) {
            return " " + item.name;
          });
          let artwork = response.item.album.images[0].url;
          let song = response.item.name;

          $("#song-name").text(song);
          $("#artist-name").text(singer);
          $("#album-artwork").attr("src", artwork);
          $("#song-id").text(response.item.uri);
        },
      });
    }, 1000);
  }
})();
