/* =========================================================
   Nero Development — For Businesses
   Compensation calculator. Projects a monthly estimate only:
   assumes 75% of captured footage is viable, paid at
   $3.50 USD per viable hour. Actual payouts are still
   disbursed bi-weekly per the collection agreement.
   ========================================================= */
(function () {
  var VIABLE_RATE = 0.75;
  var RATE_PER_HOUR = 3.5;
  var WEEKS_PER_MONTH = 4.33;

  var fields = {
    days: { min: 1, max: 7, value: 5 },
    hours: { min: 1, max: 24, value: 8 },
    employees: { min: 1, max: 999, value: 1 }
  };

  var valueEls = {};
  var ready = Object.keys(fields).every(function (key) {
    valueEls[key] = document.getElementById("calc-" + key + "-value");
    return !!valueEls[key];
  });
  if (!ready) return;

  var payoutOut = document.getElementById("calc-payout");
  var rawHoursOut = document.getElementById("calc-raw-hours");
  var viableHoursOut = document.getElementById("calc-viable-hours");

  var decimalFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
  var currencyFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function clamp(key, value) {
    var f = fields[key];
    return Math.max(f.min, Math.min(f.max, value));
  }

  function update() {
    Object.keys(fields).forEach(function (key) {
      valueEls[key].textContent = fields[key].value;
    });

    var rawHours = fields.days.value * fields.hours.value * fields.employees.value * WEEKS_PER_MONTH;
    var viableHours = rawHours * VIABLE_RATE;
    var payout = viableHours * RATE_PER_HOUR;

    rawHoursOut.textContent = decimalFormatter.format(rawHours);
    viableHoursOut.textContent = decimalFormatter.format(viableHours);
    payoutOut.textContent = currencyFormatter.format(payout);
  }

  Object.keys(fields).forEach(function (key) {
    var decBtn = document.getElementById("calc-" + key + "-dec");
    var incBtn = document.getElementById("calc-" + key + "-inc");
    decBtn.addEventListener("click", function () {
      fields[key].value = clamp(key, fields[key].value - 1);
      update();
    });
    incBtn.addEventListener("click", function () {
      fields[key].value = clamp(key, fields[key].value + 1);
      update();
    });
  });

  update();
})();
