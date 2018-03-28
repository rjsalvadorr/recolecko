
function colourRows() {
  $('#userdata tr td').each(function() {
    if ($(this).text() === 'MIDI' || $(this).text() === 'MID') {
      $(this).closest('tr').addClass('row-midi');
    } else if ($(this).text() === 'WAV') {
      $(this).closest('tr').addClass('row-wav');
    } else if ($(this).text() === 'RPP') {
      $(this).closest('tr').addClass('row-rpp');
    }
  });
}

function load() {
  data.forEach(function(file) {
      var tblRow = "<tr><td>" + file.projectId + "</td><td>" + file.name + "</td><td>" + file.tempo + "</td><td>" + file.version + "</td><td>" + file.type.toUpperCase() + "</td><td>" + file.path + "</td></tr>";
      $(tblRow).appendTo("#userdata tbody");
  });

  $.dynatableSetup({
    dataset: {
      perPageDefault: 1000,
      perPageOptions: [1000,1200,1500,1750]
    }
  });
  var normalTable = $('#userdata');
  normalTable.bind('dynatable:afterUpdate', function(e, dynatable){
    colourRows();
  });

  var dTable = $('#userdata').dynatable();
}
