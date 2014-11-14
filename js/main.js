/*
Copyright (c) 2014 Intel Corporation.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of works must retain the original copyright notice, this list
  of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the original copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
* Neither the name of Intel Corporation nor the names of its contributors
  may be used to endorse or promote products derived from this work without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY INTEL CORPORATION "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL INTEL CORPORATION BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Authors:
        Lin, Wanming <wanmingx.lin@intel.com>
*/

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

function showMessage(type, msg) {
  $("#myModal").html("<div id='modal-dialog' class='modal-dialog' style='position: fixed; width: auto; left: 25%; margin-top: 0px;'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h3 class='modal-title'><span id='myModalLabel' class='glyphicon'></span></h3></div><div id='modal-body' class='modal-body'></div><div class='modal-footer'></div></div></div>");
  $("#modal-body").html(msg);
  if (type == "help") {
    $("#modal-dialog").css("bottom", "30px");
    $("#myModalLabel").addClass("glyphicon-info-sign");
  } else if (type == "success") {
    $("#modal-dialog").css("bottom", "30%");
    $("#myModalLabel").addClass("glyphicon-ok-sign");
  } else if (type == "error") {
    $("#modal-dialog").css("bottom", "30%");
    $("#myModalLabel").addClass("glyphicon-warning-sign");
  }
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
    if(!sbg) {
      showMessage("error", "Invalid tests.xml! Miss background attribute in set node.");
    }
    if(!sicon) {
      showMessage("error", "Invalid tests.xml! Miss icon attribute in set node.");
    }
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
    testStorage();
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



