// membuat database dengan nama chelsea, versi 1
let dbPromised = idb.open("chelsea", 1, function (upgradeDb) {
  // fungsi membuat objectStore/ biasa disebut tabel, dengan nama matches
  // id = kolom untuk primary key tabel
  // tidak perlu createIndex karena kita tentuin diawal primary key ambil id
  let chelseaObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "id",
  });
});

// fungsi untuk menyimpan match baru
function saveForLater(result) {
  dbPromised
    .then(function (db) {
      // membuat transaction dengan nama matches
      let tx = db.transaction("matches", "readwrite");
      // membuka object store
      let store = tx.objectStore("matches");
      // cek dulu keberhasilannya
      console.log(result);
      // menambahkan data ke object store
      store.put({ id: result.match.id.toString(), info: result.match });
      // memberitahu bahwa proses telah selesai
      return tx.complete;
    })
    .then(function () {
      console.log("Match berhasil di simpan.");
      M.toast({ html: "Match berhasil disimpan" });
    });
}

// untuk melihat seluruh isi indexed db yang telah dibuat
function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("matches", "readonly");
        let store = tx.objectStore("matches");
        return store.getAll();
      })
      .then(function (match) {
        resolve(match);
      });
  });
}

// mengambil data saved match by id
function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("matches", "readonly");
        var store = tx.objectStore("matches");
        console.log(id);
        return store.get(id);
      })
      .then(function (match) {
        resolve(match);
      });
  });
}

// menghapus data favorite
function deleteSavedMatch(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        // var id = idParams.toString();
        // console.log(id);
        var tx = db.transaction("matches", "readwrite");
        var store = tx.objectStore("matches");
        return store.delete(id);
        tx.complete;
      })
      .then(function () {
        console.log("Item deleted");
        M.toast({ html: "Match berhasil dihapus" });
      });
  });
}

// cek id
function cekId(id) {
  const btnSave = document.getElementById("save");

  dbPromised
    .then(function (db) {
      let tx = db.transaction("matches", "readwrite");
      let store = tx.objectStore("matches");
      return store.get(id);
    })
    .then(function (data) {
      if (data) {
        btnSave.style.display = "none";
      } else {
        console.log("Data Belum Di Favorite");
      }
    });
}
