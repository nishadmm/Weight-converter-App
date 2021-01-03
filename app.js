// Calculation controller
const CalcuCtrl = (function () {

  // Public methods
  return {
    getOutputFromPound: function (pound) {
      const kilogram = pound / 2.2046;
      const gram = pound / 0.0022046;
      const ounces = pound * 16;

      return {
        kilogram,
        gram,
        ounces
      }
    },

    getOutputFromkilogram: function (kilogram) {
      const pound = kilogram * 2.2046;
      const gram = kilogram * 1000;
      const ounces = kilogram * 35.274;

      return {
        pound,
        gram,
        ounces
      }
    },

    getOutputFromGram: function (gram) {
      const pound = gram * 0.0022046;
      const kilogram = gram / 1000;
      const ounces = gram * 0.0353;

      return {
        pound,
        kilogram,
        ounces
      }
    },

    getOutputFromOunces: function (ounces) {
      const pound = ounces * 0.0625;
      const kilogram = ounces * 0.0283;
      const gram = ounces * 28.35;

      return {
        pound,
        kilogram,
        gram
      }
    }
  }
})();


// App controller
const AppCtrl = (function (CalcuCtrl) {

  let enterdInput = '';

  function loadAllEvent() {

    // Listner for options
    document.querySelector('#options').addEventListener('click', GiveNextSection);

    // Listner for input
    document.getElementById('input').addEventListener('input', getResult);

    // Listner for back btn
    document.getElementById('back-btn').addEventListener('click', function () {
      window.location.reload();
    });

  }

  // Give next section
  const GiveNextSection = function (e) {

    document.querySelector('#options-container').style.display = "none";
    document.querySelector('.cards').style.display = "none";
    document.querySelector('#result-container').style.display = "block";
    const input = document.querySelector('#input');

    // Check which option is click
    if (e.target.classList.contains('pound-option')) {
      input.setAttribute('placeholder', 'Enter Pounds');
      enterdInput = 'pound';
    } else if (e.target.classList.contains('kilogram-option')) {
      input.setAttribute('placeholder', 'Enter Kilograms');
      enterdInput = 'kilogram';
    } else if (e.target.classList.contains('gram-option')) {
      input.setAttribute('placeholder', 'Enter Grams');
      enterdInput = 'gram';
    } else if (e.target.classList.contains('ounces-option')) {
      input.setAttribute('placeholder', 'Enter Ounces');
      enterdInput = 'ounces';
    }
    e.preventDefault();
  }

  // Get result
  const getResult = function (e) {

    const inputValue = e.target.value;

    // check input value
    if (inputValue === "") {
      // Hide cards
      document.querySelector('.cards').style.display = "none";
    } else {
      // Show cards
      document.querySelector('.cards').style.display = "block";
    }

    let result;

    // Check which is entered
    if (enterdInput === 'pound') {
      result = CalcuCtrl.getOutputFromPound(inputValue);
      document.querySelector('.pound-card').style.display = "none";

    } else if (enterdInput === 'kilogram') {
      result = CalcuCtrl.getOutputFromkilogram(inputValue);
      document.querySelector('.kilogram-card').style.display = "none";

    } else if (enterdInput === 'gram') {
      result = CalcuCtrl.getOutputFromGram(inputValue);
      document.querySelector('.gram-card').style.display = "none";

    } else if (enterdInput === 'ounces') {
      result = CalcuCtrl.getOutputFromOunces(inputValue);
      document.querySelector('.ounces-card').style.display = "none";
    }

    // Give result into UI
    if (result.pound) {
      document.getElementById('pound-r').innerHTML = result.pound.toFixed(5);
    }
    if (result.kilogram) {
      document.getElementById('kilogram-r').innerHTML = result.kilogram.toFixed(5);
    }
    if (result.gram) {
      document.getElementById('gram-r').innerHTML = result.gram.toFixed(5);
    }
    if (result.ounces) {
      document.getElementById('ounces-r').innerHTML = result.ounces.toFixed(5);
    }

    e.preventDefault();
  }

  // Public methods
  return {

    init: function () {
      loadAllEvent();
    }

  }
})(CalcuCtrl);

AppCtrl.init();
