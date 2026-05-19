(function () {
  var form = document.querySelector('form[name="contact"]');
  if (!form) return;

  var fields = {
    fname: {
      input: document.getElementById('fname'),
      error: document.getElementById('fname-error'),
      validate: function (val) {
        if (!val) return 'Please enter your first name.';
        if (val.length < 2) return 'First name must be at least 2 characters.';
        return '';
      }
    },
    lname: {
      input: document.getElementById('lname'),
      error: document.getElementById('lname-error'),
      validate: function (val) {
        if (!val) return 'Please enter your last name.';
        if (val.length < 2) return 'Last name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: function (val) {
        if (!val) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address (e.g. name@domain.com).';
        return '';
      }
    },
    phone: {
      input: document.getElementById('phone'),
      error: document.getElementById('phone-error'),
      validate: function (val) {
        if (!val) return 'Please enter your phone number.';
        var digits = val.replace(/[\s\-()+]/g, '');
        if (!/^0[2-9]\d{8}$/.test(digits)) return 'Please enter a valid Australian phone number (e.g. 0412 345 678 or 03 9123 4567).';
        return '';
      }
    }
  };

  function showError(field) {
    var msg = field.validate(field.input.value.trim());
    if (msg) {
      field.input.classList.add('input-error');
      field.error.textContent = msg;
      return false;
    }
    return true;
  }

  function clearError(field) {
    field.input.classList.remove('input-error');
    field.error.textContent = '';
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener('input', function () {
      clearError(field);
    });
  });

  form.addEventListener('submit', function (e) {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!showError(fields[key])) valid = false;
    });
    if (!valid) e.preventDefault();
  });
})();
