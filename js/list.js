var lstorage = window.localStorage;

function listTest() {
  var sid = location.search.split('=')[1];
  var setarr = JSON.parse(lstorage.getItem(sid));
  var sname = setarr.name;
  $('#setname').append(sname);
  var tids = setarr.tids.split(',');
  var tbg = "color-swatches " + setarr.background;
  var ticon = "glyphicon " + setarr.icon;
  for(var i = 0; i < tids.length; i++) {
    var tid = tids[i];
    var casearr = JSON.parse(lstorage.getItem(tid));
    var tnum = parseInt(casearr.num);
    var tpass = parseInt(casearr.pass);
    var tfail = parseInt(casearr.fail);
    var tresult = casearr.result;
    var turl = "test.html?tid=" + tid;
    var resultline = "";
    if(tresult != "" && tnum > 1) {
      var resultline = '<span class=\"label label-success\">Pass:&nbsp;' + tpass + '</span>\n'
                      + '<span class=\"label label-danger\">Fail:&nbsp;' + tfail + '</span>\n'
                      + '<span class=\"label label-default\">Notrun:&nbsp;' + (tnum-tpass-tfail) + '</span>\n';
    }
    var testline = '<div class=\"col-md-3\">\n<div class=\"media ' + tresult + '\">\n'
                  + '<a class=\"pull-left\" href=\"' + turl + '\">\n'
                  + '<div class=\"' + tbg + '\"><span class=\"' + ticon + '\"></span></div>\n</a>\n'
                  + '<div class=\"media-body\">\n'
                  + '<a href=\"' + turl +'\"><h5 class=\"media-heading\">' + tid + '</h5></a>\n'
                  + resultline;
                  + '</div>\n</div>\n</div>\n';
    $('#mytest').append(testline);
  }
}

$(document).ready(function(){
  listTest();
});



