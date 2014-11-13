if(!window.localStorage) {
  showMessage("error", "This platform does not support localStorage!");
}
if(!window.sessionStorage) {
  showMessage("error", "This platform does not support sessionStorage!");
}
var lstorage = window.localStorage;
var sstorage = window.sessionStorage;

function getApps() {
  var tests = "";
  $.ajax({
    async : false,
    type : "GET",
    url : "tests.xml",
    dataType : "xml",
    success : function(xml){tests = xml;},
    error: function(e){showMessage("error", "Error:" + e.message + " occurs when parsing tests.xml file!")}
  });
  return tests;
}

function testStorage() {
  lstorage.clear();
  var tests = getApps();
  var i = 0;
  var sname, sbg, sicon, tid, tnum, tids, tpass, tfail, setarr, casearr;
  /** set loop **/
  $(tests).find("set").each(function() {
    sname = $(this).attr("name");
    sbg = $(this).attr("background");
    sicon = $(this).attr("icon");
    i++;
    var j = 0;
    /** test case loop **/
    tids = "";
    $(this).find("testcase").each(function() {
      tid = $(this).attr("id");
      tids += tid + ",";
      tnum = 1;
      if($(this).attr("subcase")) {
        tnum = $(this).attr("subcase");
      }
      casearr = {num:tnum, pass:"0", fail:"0", result:"", sid:"set" + i}; //result: "", "pass", "fail"
      j++;
      lstorage.setItem(tid, JSON.stringify(casearr)); //store case info
    });
    setarr = {name:sname, background:sbg, icon:sicon, tids:tids.substring(0, tids.length-1)};
    lstorage.setItem("set" + i, JSON.stringify(setarr)); //store set info
  });
  lstorage.setItem("setnum", i);  //store set total num
}

function listSet() {
  var snum = parseInt(lstorage.getItem("setnum"));
  for(var i = 0; i < snum; i++) {
    var sid = "set" + (i + 1);
    var setarr = JSON.parse(lstorage.getItem(sid));
    var sname = setarr.name;
    var sbg = "color-swatches " + setarr.background;
    var sicon = "glyphicon " + setarr.icon;
    var surl = "tests_list.html?sid=" + sid;
    var setline = '<div class=\"col-md-4\">\n<div class=\"media\">\n'
                  + '<a class=\"pull-left\" href=\"' + surl + '\">\n'
                  + '<div class=\"' + sbg + '\"><span class=\"' + sicon + '\"></span></div>\n</a>\n'
                  + '<div class=\"media-body\">\n'
                  + '<a href=\"' + surl +'\"><h4 class=\"media-heading\">' + sname + '</h4></a>\n' + sname + '\n'
                  + '</div>\n</div>\n</div>\n';
    $('#myset').append(setline);
  }
}

$(document).ready(function(){
  if(lstorage.getItem("setnum") == null) {
    sstorage.setItem("lsflag", "1"); //flag for once testing without exiting app
    testStorage();
  } else {
    if(sstorage.getItem("lsflag") == null) {
      //ask if need use old lstorage
    }
  }
  listSet();
});



