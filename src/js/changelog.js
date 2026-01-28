const ADMIN_PASSWORD = "master123"; // 🔴 CHANGE THIS

function login() {
  const input = document.getElementById("password").value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("editor").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

function addChangelog() {
  const version = document.getElementById("version").value;
  const content = document.getElementById("content").value;

  if (!version || !content) return alert("Fill all fields");

  const logs = JSON.parse(localStorage.getItem("changelogs") || "[]");

  logs.unshift({
    version,
    content: content.split("\n"),
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("changelogs", JSON.stringify(logs));

  alert("Changelog added!");
  document.getElementById("content").value = "";
}

function renderChangelog() {
  const container = document.getElementById("changelog");
  if (!container) return;

  const logs = JSON.parse(localStorage.getItem("changelogs") || "[]");

  if (!logs.length) {
    container.innerHTML = "<p>No updates yet.</p>";
    return;
  }

  container.innerHTML = logs.map(log => `
    <div class="changelog-card">
      <h2>${log.version} <span class="date">• ${log.date}</span></h2>
      <ul>
        ${log.content.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

renderChangelog();
