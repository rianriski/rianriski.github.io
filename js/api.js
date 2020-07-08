const API_KEY = "06b0d7121ef141a8be77a5461d529202";
const BASE_URL = "https://api.football-data.org/v2/";

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/2021/standings`;
const ENDPOINT_CHELSEA = `${BASE_URL}teams/61`;
const ENDPOINT_MATCH = `${BASE_URL}teams/61/matches`;
const ENDPOINT_MATCH_ID = `${BASE_URL}matches/`;

const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
      // handle CORS sementara
      Connection: "keep-alive",
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText));
      } else {
        return Promise.resolve(res);
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// ========================== FOR STANDING =============================
function getStanding() {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Competition Data: " + data);
          showStanding(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then((data) => {
      showStanding(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showStanding(data) {
  let standings = "";
  let standingElement = document.getElementById("standing");

  data.standings[0].table.forEach(function (standing) {
    standings += `
            <tr>
                <td><div class="center">${standing.position}</div></td>
                <td><div class="center"><img src="${standing.team.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )}" width="30px" height="30px" alt="badge"/></div></td>
                <td>${standing.team.name}</td>
                <td><div class="center">${standing.playedGames}</div></td>
                <td><div class="center">${standing.won}</div></td>
                <td><div class="center">${standing.draw}</div></td>
                <td><div class="center">${standing.lost}</div></td>
                <td><div class="center">${standing.points}</div></td>
                <td><div class="center">${standing.goalsFor}</div></td>
                <td><div class="center">${standing.goalsAgainst}</div></td>
                <td><div class="center">${standing.goalDifference}</div></td>
            </tr>
    `;
  });

  standingElement.innerHTML = `
            <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 50px;">

            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th><img src="/img/icons/icon-192x192.png" class="opacit" alt="badge"/></th>
                        <th>Team Name</th>
                        <th>PG</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>P</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                    </tr>
                 </thead>
                <tbody>
                    ${standings}
                </tbody>
            </table>
            
            </div>
`;
}

// ========================== FOR TEAM =============================
function getTeam() {
  if ("caches" in window) {
    caches.match(ENDPOINT_CHELSEA).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Team Data: " + data);
          showTeam(data);
          showSquad(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_CHELSEA)
    .then((data) => {
      showTeam(data);
      showSquad(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showTeam(data) {
  let teams = "";
  let teamTable = document.getElementById("team");

  teams += `
              <tr>
                <td>${data.name}</td>
                <td>${data.address}</td>
                <td>${data.phone}</td>
                <td>${data.founded}</td>
                <td>${data.venue}</td>
              </tr>
    `;

  teamTable.innerHTML = `
                          <table class="highlight responsive-table">
                            <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Address</th>
                                  <th>Phone</th>
                                  <th>Founded</th>
                                  <th>Venue</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${teams}
                            </tbody>
                          </table>
`;
}

function showSquad(data) {
  let squad = "";
  let squadTable = document.getElementById("squad");

  data.squad.forEach(function (e) {
    squad += `
          <tr>
            <td>${e.name}</td>
            <td>${e.position}</td>
            <td>${e.nationality}</td>
            <td>${e.dateOfBirth.substr(0, 10)}</td>
            <td>${e.role}</td>
          </tr>
    `;
  });

  squadTable.innerHTML = `
                      <table class="striped responsive-table mar-bot">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>Date of Birth</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${squad}
                        </tbody>
                      </table>
`;
}

// ========================== FOR MATCH =============================
function getMatch() {
  if ("caches" in window) {
    caches.match(ENDPOINT_MATCH).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Match Data: " + data);
          showMatch(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_MATCH)
    .then((data) => {
      showMatch(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMatch(data) {
  let match = "";
  let matchTable = document.getElementById("match");

  data.matches.forEach(function (e) {
    match += `
    <tr>
      <td><div class="center">${e.utcDate.substr(0, 10) || "Not Set"}</div></td>
      <td><div class="center">${e.homeTeam.name || "Not Set"}&nbsp;&nbsp;${
      e.score.fullTime.homeTeam || "0"
    }</div></td>
      <td><div class="center">VS</div></td>
      <td><div class="center">${e.awayTeam.name || "Not Set"}&nbsp;&nbsp;${
      e.score.fullTime.awayTeam || "0"
    }</div></td>
      <td><div class="center">
      <a
        class="waves-effect waves-light btn btn-small blue darken-2" href="detail.html?id=${
          e.id
        }"
        ><i class="material-icons left">info_outline</i>Detail</a
      ></div>
      </td>
    </tr>
    `;
  });

  matchTable.innerHTML = `
                      <table class="striped responsive-table">
                        <thead>
                          <tr>
                          <th class="center">Date</th>
                          <th class="center-align">Home Team</th>
                          <th class="center-align">VS</div></th>
                          <th class="center-align">Away Team</th>
                          <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          ${match}
                        </tbody>
                      </table>
`;
}

function getMatchById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idMatch = urlParams.get("id");

    if ("caches" in window) {
      caches.match(ENDPOINT_MATCH_ID + idMatch).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            showDetail(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(ENDPOINT_MATCH_ID + idMatch)
      .then((data) => {
        showDetail(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function showDetail(data) {
  let detailDiv = document.getElementById("detail-content");
  e = data.match;

  detailDiv.innerHTML = `
  <h4>Detail Match</h4>
  <hr />
  <div class="row l6" id="team">
    <table class="striped">
      <tr>
        <th>Date</th>
        <td>${e.utcDate.substr(0, 10) || "Not Set"}</td>
      </tr>
      <tr>
        <th>Venue</th>
        <td>${e.venue || "Not Set"}</td>
      </tr>
      <tr>
        <th>Matchday</th>
        <td>${e.matchday || "Not Set"}</td>
      </tr>
      <tr>
        <th>Home Team</th>
        <td>${e.homeTeam.name || "Not Set"}</td>
      </tr>
      <tr>
        <th>Awal Team</th>
        <td>${e.awayTeam.name || "Not Set"}</td>
      </tr>
      <tr>
        <th>Half Time</th>
        <td>
        ${e.homeTeam.name || "Not Set"}&nbsp;&nbsp;&nbsp;${
    e.score.halfTime.homeTeam || "0"
  } 
        &nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;${
          e.score.halfTime.awayTeam || "0"
        } 
        &nbsp;&nbsp;&nbsp;${e.awayTeam.name || "Not Set"}
        </td>
      </tr>
      <tr>
        <th>Full Time</th>
        <td>
        ${e.homeTeam.name}&nbsp;&nbsp;&nbsp;${e.score.fullTime.homeTeam || "0"}
        &nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;${
          e.score.fullTime.awayTeam || "0"
        }
        &nbsp;&nbsp;&nbsp;${e.awayTeam.name || "Not Set"}
        </td>
      </tr>
    </table>
  </div>
  `;
}

// ========================== FOR SAVED/ INDEXED DB =============================
// mendapatkan file/data artikel yang telah di saved
function getSavedMatch() {
  getAll().then(function (match) {
    // untuk cek di console aja
    console.log(match);
    // menyusun komponen dan menampilkannya
    showSavedMatch(match);
  });
}

function showSavedMatch(data) {
  let match = "";
  let matchTable = document.getElementById("saved");

  data.forEach(function (e) {
    match += `
    <tr>
      <td><div class="center">${e.info.utcDate.substr(0, 10)}</div></td>
      <td><div class="center">${e.info.homeTeam.name}&nbsp;&nbsp;${
      e.info.score.fullTime.homeTeam || "0"
    }</div></td>
      <td><div class="center">VS</div></td>
      <td><div class="center">${e.info.awayTeam.name}&nbsp;&nbsp;${
      e.info.score.fullTime.awayTeam || "0"
    }</div></td>
      <td><div class="center">
      <a
        class="waves-effect waves-light btn btn-small blue darken-2 center" href="detail.html?id=${
          e.id
        }&saved=true"
        ><i class="material-icons left">info_outline</i>Detail</a
      ></div>
      </td>
    </tr>
    `;
  });

  matchTable.innerHTML = `
                      <table class="striped responsive-table">
                        <thead>
                          <tr>
                            <th class="center">Date</th>
                            <th class="center-align">Home Team</th>
                            <th class="center-align">VS</div></th>
                            <th class="center-align">Away Team</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          ${match}
                        </tbody>
                      </table>
`;
}

// mengambil saved article by id
function getSavedMatchById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (detail) {
    showSavedDetail(detail);
  });
}

function showSavedDetail(data) {
  let detailDiv = document.getElementById("detail-content");
  e = data.info;

  detailDiv.innerHTML = `
  <h4>Detail Match</h4>
  <hr />
  <div class="row l6" id="team">
    <table class="striped">
      <tr>
        <th>Date</th>
        <td>${e.utcDate.substr(0, 10)}</td>
      </tr>
      <tr>
        <th>Venue</th>
        <td>${e.venue}</td>
      </tr>
      <tr>
        <th>Matchday</th>
        <td>${e.matchday}</td>
      </tr>
      <tr>
        <th>Home Team</th>
        <td>${e.homeTeam.name}</td>
      </tr>
      <tr>
        <th>Awal Team</th>
        <td>${e.awayTeam.name}</td>
      </tr>
      <tr>
        <th>Half Time</th>
        <td>
        ${e.homeTeam.name}&nbsp;&nbsp;&nbsp;${e.score.halfTime.homeTeam || "0"} 
        &nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;${
          e.score.halfTime.awayTeam || "0"
        } 
        &nbsp;&nbsp;&nbsp;${e.awayTeam.name}
        </td>
      </tr>
      <tr>
        <th>Full Time</th>
        <td>
        ${e.homeTeam.name}&nbsp;&nbsp;&nbsp;${e.score.fullTime.homeTeam || "0"}
        &nbsp;&nbsp;&nbsp;VS&nbsp;&nbsp;&nbsp;${
          e.score.fullTime.awayTeam || "0"
        }
        &nbsp;&nbsp;&nbsp;${e.awayTeam.name}
        </td>
      </tr>
    </table>
  </div>
  `;
}

function tombolSave(id) {
  return getById(id).then(function (detail) {
    aksi(detail);
    console.log(detail);
  });
}

function aksi(detail) {
  let id = detail.id;
  console.log(id);

  return id;
}
