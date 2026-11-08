// Quote form: sends to Web3Forms (free). Replace the access key in index.html.
(function () {
  var form = document.getElementById("quote-form");
  if (!form) return;
  var msg = document.getElementById("form-msg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website.value) return; // honeypot
    var btn = form.querySelector("button");
    btn.disabled = true;
    msg.textContent = "Sending...";
    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success) {
          form.reset();
          msg.textContent = "Thank you. We will reply within one working day.";
        } else {
          throw new Error(d.message || "Failed");
        }
      })
      .catch(function () {
        msg.textContent = "Sending failed. Please email darshanchemical@gmail.com or message us on WhatsApp.";
      })
      .finally(function () { btn.disabled = false; });
  });
})();
