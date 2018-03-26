
function load() {
            
  data.forEach(function(file) {
      var tblRow = "<tr>" + "<td>" + file.projectId + "</td>" +
      "<td>" + file.name + "</td>" + "<td>" + file.tempo + "</td>" + "<td>" + file.version + "</td>" + "<td>" + file.type.toUpperCase() + "</td>" + "</tr>"
      $(tblRow).appendTo("#userdata tbody");
  });

  $.dynatableSetup({
    dataset: {
      perPageDefault: 1000,
      perPageOptions: [1000,1200,1500,1750]
    }
  });
  var dTable = $('#userdata').dynatable();
}
