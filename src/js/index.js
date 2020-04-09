import '../styles/styles.css';

let radioButtons = $('<label class="container">All' +
  '<input type="radio" checked="checked" name="settings" value="1"><span class="checkmark"></span></label>' +
  '<label class="container">Gold' +
  '<input type="radio" name="settings" value="2"><span class="checkmark"></span></label>' +
  '<label class="container">Silver' +
  '<input type="radio" name="settings" value="3"><span class="checkmark"></span></label>' +
  '<label class="container">Bronze' +
  '<input type="radio" name="settings" value="4"><span class="checkmark"></span></label>');

radioButtons.appendTo('#radio');
$('#radio').hide();

$('input[name="settings"]').on('change', function () {
  if ($(this).val() === '1') {
    $(tableRowSelectors[0]).show();
    $(tableRowSelectors[1]).show();
    $(tableRowSelectors[2]).show();
  } else if ($(this).val() === '2') {
    $(tableRowSelectors[0]).hide();
    $(tableRowSelectors[1]).hide();
    $(tableRowSelectors[2]).show();
  } else if ($(this).val() === '3') {
    $(tableRowSelectors[0]).hide();
    $(tableRowSelectors[1]).show();
    $(tableRowSelectors[2]).hide();
  } else if ($(this).val() === '4') {
    $(tableRowSelectors[0]).show();
    $(tableRowSelectors[1]).hide();
    $(tableRowSelectors[2]).hide();
  }
});

$(document).ready(function () {
  $('#radio').show();
  var p1 = new Promise((resolve, reject) => {
    resolve();
  });
  p1.then(getData);
});

let count = 0;
let urls = [];
let userData = [];
let row_id = [];
let tableRowSelectors = ['.table__row_bronze', '.table__row_silver', '.table__row_gold'];
let usersUrl = 'https://api.github.com/repos/thomasdavis/backbonetutorials/contributors';
let userFields = ['login', 'id', 'contributions', 'group', 'company', 'location', 'email'];
let userFieldsModal = ['login', 'id', 'contributions', 'company', 'location', 'email'];
let selector;
let isNum;

function getData() {
  fetch(usersUrl)
    .then(response => {
      return response.json();
    }).then(data => {
    $.each(data, function (index) {
      if (!userData[index]) userData[index] = [];
      userData[index][0] = data[index].login;
      userData[index][1] = data[index].id;
      userData[index][2] = data[index].contributions;
      if (userData[index][2] <= 10) {
        userData[index][3] = 'Bronze';
      } else if (userData[index][2] <= 100) {
        userData[index][3] = 'Silver';
      } else userData[index][3] = 'Gold';

      urls.push(data[index].url);
    });
  }).then(getIndividualData)
    .catch(error => {
      console.log(error);
    });
}

function getIndividualData() {
  for (let i = 0; i < 1; i++) {
    fetch(urls[i])
      .then(response => {
        return response.json();
      }).then(data => {
      userData[i][4] = data.company;
      userData[i][5] = data.location;
      userData[i][6] = data.email;
      count++;
      if (count === 1) fillTable();
    }).catch(error => {
      console.log(error);
    });
  }
}

function fillTable() {
  $('<table id="tbl_1" class="table"></table>').appendTo('.main');
  $('<thead id="th_1"></thead>').appendTo('.table');
  $('<tr id="tr_headers"></tr>').appendTo('#th_1');
  $('<th></th>').appendTo('#tr_headers');
  for (let i = 0; i < 7; i++) {
    $('<th class="table__header" id="th_' + i + '">' + userFields[i] + '</th>').appendTo('#tr_headers');
  }
  $('<tbody id="tb_1"></tbody>').appendTo('.table');
  for (let i = 0; i < userData.length; i++) {
    $('<tr id="tr_' + i + '" class="table__row"></tr>').appendTo('#tb_1');
    $('<button class="button-edit-profile">Edit Profile</button>').appendTo('#tr_' + i);
    for (let j = 0; j < 7; j++) {
      if (j === 3) {
        if (userData[i][j] === 'Bronze') {
          $('#tr_' + i).addClass('table__row_bronze')
        } else if (userData[i][j] === 'Silver') {
          $('#tr_' + i).addClass('table__row_silver')
        } else $('#tr_' + i).addClass('table__row_gold')
      }
      $('<td id="td_' + userFields[j] + '_' + i + '" class="table__cell">' + userData[i][j] + '</td>').appendTo('#tr_' + i);
    }
  }

  sortTable();
}

$('.main').on('click', '.button-edit-profile', function () {
  row_id = $(this).closest('tr').attr('id').split('_');
  fillModalWindow(row_id[1]);
  $('.modal').css('display', 'block');
});

$('.modal__content').on('click', '.close, .cancel', function () {
  $('.modal').css('display', 'none');
  $('#label_login, #label_id, #label_contributions, #label_email').text('');
}).on('click', '.save', function () {
  submitInfo(row_id[1]);
});

let modal = document.getElementById("modal_1");

window.onclick = function (event) {
  if (event.target === modal) {
    $('.modal').hide();
    $('#label_login, #label_id, #label_contributions, #label_email').text('');
  }
};

function fillModalWindow(id) {
  for (let i = 0; i < userFieldsModal.length; i++) {
    selector = `#td_${userFieldsModal[i]}_${id}`;
    if ($(selector).text() === 'null' || $(selector).text() === 'undefined') {
      $(`#field_${userFieldsModal[i]}`).val('');
    } else $(`#field_${userFieldsModal[i]}`).val($(selector).text());
  }
}

function submitInfo(id) {
  let shouldSubmit = true;

  for (let i = 0; i < 3; i++) {
    if ($(`#field_${userFieldsModal[i]}`).val().length === 0) {
      $(`#label_${userFieldsModal[i]}`).text('Please specify ' + userFieldsModal[i]);
      shouldSubmit = false;
    }
  }

  for (let i = 1; i < 3; i++) {
    if ($(`#field_${userFieldsModal[i]}`).val().length !== 0) {
      isNum = /^\d+$/.test($(`#field_${userFieldsModal[i]}`).val());
      if (!(isNum)) {
        $(`#label_${userFieldsModal[i]}`).text(userFieldsModal[i] + ' field should only contain numbers');
        shouldSubmit = false;
      }
    }
  }

  if ($('#field_email').val().length !== 0) {
    let containsAtSign = $('#field_email').val().includes('@');
    if (!(containsAtSign)) {
      $('#label_email').text('Email field must contain @');
      shouldSubmit = false;
    }
  }

  if (shouldSubmit) {
    for (let i = 0; i < userFieldsModal.length; i++) {
      $(`#td_${userFieldsModal[i]}_` + id).text($(`#field_${userFieldsModal[i]}`).val());
    }

    selector = '#field_contributions';

    if ($(selector).val() <= 10) {
      $('#td_group_' + id).text('Bronze');
      $('#tr_' + id).removeClass('table__row_silver table__row_gold').addClass('table__row_bronze');
    } else if ($(selector).val() <= 100) {
      $('#td_group_' + id).text('Silver');
      $('#tr_' + id).removeClass('table__row_bronze table__row_gold').addClass('table__row_silver');
    } else {
      $('#td_group_' + id).text('Gold');
      $('#tr_' + id).removeClass('table__row_bronze table__row_silver').addClass('table__row_gold');
    }

    $('.modal').css('display', 'none');
    $('#label_login, #label_id, #label_contributions, #label_email').text('');
  }
}

function sortTable() {
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
      v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
  )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  document.querySelectorAll('.table__header').forEach(function (th) {
    th.addEventListener('click', function () {
      const table = th.closest('.table');
      Array.from(table.querySelectorAll('.table__row')).sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc)).forEach(function (tr) {
        table.appendChild(tr);
      })
    })
  });
}
