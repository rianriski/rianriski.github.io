document.addEventListener("DOMContentLoaded", function () {
  // inisialisasi sidenav
  const menuSide = document.querySelectorAll(".sidenav");
  M.Sidenav.init(menuSide);
  loadNav();
  loadSide();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        // menambahkan menu ke navbar
        document.querySelectorAll(".topnav").forEach(function (menu) {
          menu.innerHTML = xhttp.responseText;
        });

        // menambahkan event click ke masing2 menuNav
        document.querySelectorAll(".topnav a").forEach(function (menuNav) {
          menuNav.addEventListener("click", function (event) {
            // memanggil halaman sesuai menu yang di click
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "pages/nav/nav.html", true);
    xhttp.send();
  }

  function loadSide() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        // menambahkan menu ke sidenav
        document.querySelectorAll(".sidenav").forEach(function (menu) {
          menu.innerHTML = xhttp.responseText;
        });

        // menambahkan event click ke masing2 menuNav
        document.querySelectorAll(".sidenav a").forEach(function (menuNav) {
          menuNav.addEventListener("click", function (event) {
            // fungsi untuk menutup sideNav ketika aktif
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // memanggil halaman sesuai menu yang di click
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "pages/nav/side.html", true);
    xhttp.send();
  }

  // load isi konten dari pages
  let page = window.location.hash.substr(1);
  if (page === "") {
    page = "standing";
    loadPage(page);
  } else {
    loadPage(page);
  }

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector("#body-content");
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          if (page === "standing") {
            getStanding();
          } else if (page === "team") {
            getTeam();
          } else if (page === "match") {
            getMatch();
          } else if (page === "saved") {
            getSavedMatch();
          }
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
});
