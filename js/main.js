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
  var tests = getApps();
  var i = 0;
  var sname, sbg, sicon, tid, tids, tnum, tpass, tfail, setarr, casearr;
  /** set loop **/
  $(tests).find("set").each(function() {
    sname = $(this).attr("name");
    sbg = $(this).attr("background");
    sicon = $(this).attr("icon");
    i++;
    var j = 0;
    /** test case loop **/
    $(tests).find("testcase").each(function() {
      tid = $(this).attr("id");
      tids += tid + ",";
      tnum = 1;
      if($(this).attr("subcase")) {
        tnum = $(this).attr("subcase");
      }
      casearr = {id:tid, num:tnum, pass:"N/A", fail:"N/A"};
      j++;
      lstorage.setItem(tid, JSON.stringify(casearr)); //store case info
    });
    setarr = {name:sname, background:sbg, icon:sicon, tids:tids.substring(0, tids.length-1)};
    lstorage.setItem("set" + i, JSON.stringify(setarr)); //store set info
  });
  lstorage.setItem("setnum", i);  //store set total num
}

function showMessage(type, msg) {

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
});



