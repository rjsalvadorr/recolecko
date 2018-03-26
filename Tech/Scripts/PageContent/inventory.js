
function colourRows() {
  $('#userdata tr td').each(function() {
    if ($(this).text() === 'MIDI' || $(this).text() === 'MID') {
        $(this).closest('tr').css('background-color', '#570009');
    } else if ($(this).text() === 'WAV') {
      $(this).closest('tr').css('background-color', '#0A0A0A');
    }
  });
}

function load() {
  data.forEach(function(file) {
      var tblRow = "<tr><td>" + file.projectId + "</td><td>" + file.name + "</td><td>" + file.tempo + "</td><td>" + file.version + "</td><td>" + file.type.toUpperCase() + "</td></tr>";
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
