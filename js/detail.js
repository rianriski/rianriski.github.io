document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const btnSave = document.getElementById("save");
  const btnBackMatch = document.getElementById("back-match");
  const btnBackFav = document.getElementById("back-fav");
  const btnDelete = document.getElementById("delete");
  const arrowMatch = document.getElementById("match");
  const arrowFavorit = document.getElementById("fav");
  let isFromSaved = urlParams.get("saved");
  let id = urlParams.get("id");

  if (isFromSaved) {
    // sembunyikan tombol save dan back match
    btnSave.style.display = "none";
    btnBackMatch.style.display = "none";
    arrowMatch.style.display = "none";

    // ambil data match lalu tampilkan
    getSavedMatchById();
  } else {
    // sembunyikan tombol back fav dan delete
    btnBackFav.style.display = "none";
    btnDelete.style.display = "none";
    arrowFavorit.style.display = "none";
  }

  window.onload = function () {
    let item = getMatchById();

    btnSave.onclick = function () {
      // notif ketika tombol ditekan
      console.log("Tombol save ditekan");
      // jalankan fungsi simpan di indexed db
      item.then(function (match) {
        saveForLater(match);
      });
    };
    btnDelete.onclick = function () {
      // notif ketika tombol ditekan
      console.log("Tombol delete ditekan");
      console.log(id);
      // jalankan fungsi delete di indexed db
      deleteSavedMatch(id);
    };

    // hilangkan tombol add to favorite jika data exist
    cekId(id);
  };
});
