import '../styles/styles.css';

let radioButtons = $('<input type="radio" id="radioButton_1" name="settings" value="1" checked="true"/>\n' +
  '<label for="radioButton_1" name="settings" value="1"/><span></span>All</label>\n' +
  '<p></p>\n' + '<input type="radio" id="radioButton_2" name="settings" value="2"//>\n' +
  '<label for="radioButton_2"><span></span>Bronze</label>\n' +
  '<p></p>\n' + '<input type="radio" id="radioButton_3" name="settings" value="3"//>\n' +
  '<label for="radioButton_3"><span></span>Silver</label>\n' +
  '<p></p>\n' + '<input type="radio" id="radioButton_4" name="settings" value="4"//>\n' +
  '<label for="radioButton_4"><span></span>Gold</label>\n' +
  '<p></p>');

radioButtons.appendTo('#radio');
$('#radio').hide();

$('input[name="settings"]').on('change', function () {
  if ($(this).val() === '1') {
    $('.table__row_bronze').show();
    $('.table__row_silver').show();
    $('.table__row_gold').show();
  } else if ($(this).val() === '2') {
    $('.table__row_bronze').show();
    $('.table__row_silver').hide();
    $('.table__row_gold').hide();
  } else if ($(this).val() === '3') {
    $('.table__row_bronze').hide();
    $('.table__row_silver').show();
    $('.table__row_gold').hide();
  } else if ($(this).val() === '4') {
    $('.table__row_bronze').hide();
    $('.table__row_silver').hide();
    $('.table__row_gold').show();
  }
});

let count = 0;
let urls = [];
let userData = [];

for (let i = 0; i < 30; i++) {
  if (!userData[i]) {
    userData[i] = [];
  }
}

function getIndividualUsers() {
  for (let i = 0; i < 1; i++) {
    $.getJSON(urls[i], function (data) {
      userData[i][0] = data.company;
      userData[i][1] = data.location;
      userData[i][2] = data.email;

      count++;
      if (count === 1) showIndividualUsers();
    });
  }
}

function showIndividualUsers() {
  for (let i = 0; i < 30; i++) {
    table_cell = ('<td id="td_company_' + i + '" class="table__cell">' + userData[i][0] + '</td>');
    $(table_cell).appendTo("#tr_" + i);
    table_cell = ('<td id="td_location_' + i + '" class="table__cell">' + userData[i][1] + '</td>');
    $(table_cell).appendTo("#tr_" + i);
    table_cell = ('<td id="td_email_' + i + '" class="table__cell">' + userData[i][2] + '</td>');
    $(table_cell).appendTo("#tr_" + i);
  }
  sortTable();
}

$('#btn_1').click(function () {
  $('#btn_1').hide();
  $('#radio').show();
  var p1 = new Promise((resolve, reject) => {
    resolve();
  });

  p1.then(getData);
});

let table_cell;

function getData() {
  $.getJSON('https://api.github.com/repos/thomasdavis/backbonetutorials/contributors', function (data) {
    let table;
    let table_row;
    let table_header;
    let button_edit_profile;

    table = $('<table id="tbl_1" class="table"></table>');
    table.appendTo('.main');
    $('<thead id="th_1"></thead>').appendTo('.table');
    table_row = ('<tr id="tr_header"></tr>');
    $(table_row).appendTo('#th_1');
    table_header = $('<th></th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_1">Login</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_2">Id</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_3">Contributions</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_4">Group</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_5">Company</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_6">Location</th>');
    table_header.appendTo('#tr_header');
    table_header = $('<th class="table__header" id="th_7">Email</th>');
    table_header.appendTo('#tr_header');
    $('<tbody id="tb_1"></tbody>').appendTo('.table');

    $.each(data, function (index) {
      table_row = ('<tr id="tr_' + index + '" class="table__row"></tr>');
      $(table_row).appendTo('#tb_1');
      button_edit_profile = ('<button class="button-edit-profile">Edit Profile</button>');
      $(button_edit_profile).appendTo('#tr_' + index);
      table_cell = ('<td id="td_login_' + index + '" class="table__cell">' + data[index].login + '</td>');
      $(table_cell).appendTo('#tr_' + index);
      table_cell = ('<td id="td_id_' + index + '" class="table__cell">' + data[index].id + '</td>');
      $(table_cell).appendTo('#tr_' + index);
      table_cell = ('<td id="td_contributions_' + index + '" class="table__cell">' + data[index].contributions + '</td>');
      $(table_cell).appendTo('#tr_' + index);
      if (data[index].contributions <= 10) {
        table_cell = ('<td id="td_group_' + index + '" class="table__cell">Bronze</td>');
        $(table_cell).appendTo('#tr_' + index);
        $('#tr_' + index).addClass('table__row_bronze');
      } else if (data[index].contributions <= 100) {
        table_cell = ('<td id="td_group_' + index + '" class="table__cell">Silver</td>');
        $(table_cell).appendTo('#tr_' + index);
        $('#tr_' + index).addClass('table__row_silver');
      } else {
        table_cell = ('<td id="td_group_' + index + '" class="table__cell">Gold</td>');
        $(table_cell).appendTo('#tr_' + index);
        $('#tr_' + index).addClass('table__row_gold');
      }

      urls.push(data[index].url);
    });
  }).then(getIndividualUsers);
}

let row_id = [];

$('.main').on('click', '.button-edit-profile', function () {
  row_id = $(this).closest('tr').attr('id').split('_');
  fillModalWindow(row_id[1]);
  $('.modal').css('display', 'block');
});

$('.modal__content').on('click', '.close, .cancel', function () {
  $('.modal').css('display', 'none');
  $('#label_login').text('');
  $('#label_id').text('');
  $('#label_contributions').text('');
  $('#label_email').text('');
});

$('.modal__content').on('click', '.save', function () {
  submitInfo(row_id[1]);
});

let modal = document.getElementById("modal_1");

window.onclick = function (event) {
  if (event.target == modal) {
    $('.modal').hide();
    $('#label_login').text('');
    $('#label_id').text('');
    $('#label_contributions').text('');
    $('#label_email').text('');
  }
};

function fillModalWindow(id) {
  if (($('#td_login_' + id).text()) === 'null' || ($('#td_login_' + id).text()) === 'undefined') {
    $('#field_login').val('');
  } else {
    $('#field_login').val($('#td_login_' + id).text());
  }

  if (($('#td_id_' + id).text()) === 'null' || ($('#td_id_' + id).text()) === 'undefined') {
    $('#field_id').val('');
  } else {
    $('#field_id').val($('#td_id_' + id).text());
  }

  if (($('#td_contributions_' + id).text()) === 'null' || ($('#td_contributions_' + id).text()) === 'undefined') {
    $('#field_contributions').val('');
  } else {
    $('#field_contributions').val($('#td_contributions_' + id).text());
  }

  if (($('#td_company_' + id).text()) === 'null' || ($('#td_company_' + id).text()) === 'undefined') {
    $('#field_company').val('');
  } else {
    $('#field_company').val($('#td_company_' + id).text());
  }

  if (($('#td_location_' + id).text()) === 'null' || ($('#td_location_' + id).text()) === 'undefined') {
    $('#field_location').val('');
  } else {
    $('#field_location').val($('#td_location_' + id).text());
  }

  if (($('#td_email_' + id).text()) === 'null' || ($('#td_email_' + id).text()) === 'undefined') {
    $('#field_email').val('');
  } else {
    $('#field_email').val($('#td_email_' + id).text());
  }
}

function submitInfo(id) {
  let shouldSubmit = true;
  let isNum;

  if ($('#field_login').val().length === 0) {
    $('#label_login').text('Please specify login');
    shouldSubmit = false;
  }

  if ($('#field_id').val().length !== 0) {
    let isNum = /^\d+$/.test($('#field_id').val());
    if (!(isNum)) {
      $('#label_id').text('Id field should only contain numbers');
      shouldSubmit = false;
    }
  } else {
    $('#label_id').text('Please specify id');
    shouldSubmit = false;
  }

  if ($('#field_contributions').val().length !== 0) {
    isNum = /^\d+$/.test($('#field_contributions').val());
    if (!(isNum)) {
      $('#label_contributions').text('Contributions field should only contain numbers');
      shouldSubmit = false;
    }
  } else {
    $('#label_contributions').text('Please specify contributions');
    shouldSubmit = false;
  }


  if ($('#field_email').val().length !== 0) {
    let containsAtSign = $('#field_email').val().includes('@');
    if (!(containsAtSign)) {
      $('#label_email').text('Email field must contain @');
      shouldSubmit = false;
    }
  }

  if (shouldSubmit) {
    $('#td_login_' + id).text($('#field_login').val());
    $('#td_id_' + id).text($('#field_id').val());
    $('#td_contributions_' + id).text($('#field_contributions').val());
    $('#td_email_' + id).text($('#field_email').val());
    $('#td_company_' + id).text($('#field_company').val());
    $('#td_location_' + id).text($('#field_location').val());

    if ($('#field_contributions').val() <= 10) {
      $('#td_group_' + id).text('Bronze');
      $('#tr_' + id).removeClass('table__row_silver table__row_gold').addClass('table__row_bronze');
    } else if ($('#field_contributions').val() <= 100) {
      $('#td_group_' + id).text('Silver');
      $('#tr_' + id).removeClass('table__row_bronze table__row_gold').addClass('table__row_silver');
    } else {
      $('#td_group_' + id).text('Gold');
      $('#tr_' + id).removeClass('table__row_bronze table__row_silver').addClass('table__row_gold');
    }

    $('.modal').css('display', 'none');
    $('#label_login').text('');
    $('#label_id').text('');
    $('#label_contributions').text('');
    $('#label_email').text('');
  }
}

function sortTable() {
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
      v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
  )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  document.querySelectorAll('.table__header').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('.table');
    Array.from(table.querySelectorAll('.table__row'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => table.appendChild(tr));
  })));
}
