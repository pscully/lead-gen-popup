import Swal from 'sweetalert2';
import jQuery from 'jquery';

const calculateButton = document.getElementById('calculate-results');
const ipAPI = 'https://api.ipify.org?format=json';

let ipAddress = '';

calculateButton.addEventListener('click', getLead);

const inputValue = () => {
  fetch(ipAPI)
    .then(response => response.json())
    .then(data => (ipAddress = data.ip));
};

async function getLead() {
  let timestamp = Date.now();
  inputValue();
  const { value: formValues } = await Swal.fire({
    title: 'Enter your name and email:',
    html:
      '<input id="swal-input1" class="swal2-input" name="name" placeholder="Joe">' +
      '<input id="swal-input2" class="swal2-input" name="email" placeholder="joe@email.com">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        name: document.getElementById('swal-input1').value,
        email: document.getElementById('swal-input2').value,
        ipAddress: ipAddress,
        timestamp: timestamp
      };
    }
  });

  if (formValues) {
    jQuery.ajax({
      url: 'https://hooks.zapier.com/hooks/catch/5431602/oov0la8/',
      type: 'POST',
      data: JSON.stringify(formValues),
      dataType: 'json',
      async: false,
      success: function(msg) {
        alert(msg);
      }
    });
    console.log(formValues);
  }
}
