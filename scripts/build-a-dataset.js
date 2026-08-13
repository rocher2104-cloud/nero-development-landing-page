/* =========================================================
   Nero Development — Build a Dataset
   Contact form status enhancement.

   The form's own `action="mailto:…" enctype="text/plain"` is
   the real delivery mechanism: submitting it opens the
   visitor's email client with the fields as the message body.
   That works with zero JS. This script only adds a status
   message so the visitor isn't left wondering why the page
   didn't visibly change — it never calls preventDefault, so
   the native mailto submission always proceeds.
   ========================================================= */
(function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", function () {
    status.textContent = "Opening your email client to send this…";
    status.classList.add("form-status--visible");
  });
})();
