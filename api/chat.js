<script>
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");

  // ←★ Enterキーで送信
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 改行防止
      send();
    }
  });

  function addMessage(text, role) {
    const div = document.createElement("div");
    div.className = "msg " + role;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  let loadingDiv = null;

  function showLoading() {
    loadingDiv = document.createElement("div");
    loadingDiv.className = "msg ai loading";
    loadingDiv.textContent = "...";
    chat.appendChild(loadingDiv);
    chat.scrollTop = chat.scrollHeight;
  }

  function hideLoading() {
    if (loadingDiv) {
      chat.removeChild(loadingDiv);
      loadingDiv = null;
    }
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    addMessage(text, "user");
    showLoading();

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    hideLoading();

    addMessage(data.reply, "ai");
  }
</script>
