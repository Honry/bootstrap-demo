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

var lstorage = window.localStorage;
var tid = location.search.split('=')[1];
var casearr = JSON.parse(lstorage.getItem(tid));
var sid = casearr.sid;

function subcaseStorage() {
  $.getJSON('subcase.json', function(subcase) {
    var i = 0;
    $.each(subcase, function(infoIndex, info) {
      i++;
      var subcasearr = {id: info["id"], entry: info["entry"], result:"", tid: tid}; //result: "pass", "fail", ""
      lstorage.setItem(tid + i, JSON.stringify(subcasearr)); //store subcase info
    });
    lstorage.setItem(tid + "-num", i);
  });
}

function back() {
  window.location.href = "../../tests_list.html?sid=" + sid;
}

function listSubcase() {
  var setarr = JSON.parse(lstorage.getItem(sid));
  var tbg = "color-swatches " + setarr.background;
  var ticon = "glyphicon " + setarr.icon;
  var tnum = parseInt(casearr.num);
  var passnum = failnum = 0;
  var tresult = "";
  for(var i = 0; i < tnum; i++) {
    var subkey = tid + (i + 1);
    var subcasearr = JSON.parse(lstorage.getItem(subkey));
    var subresult = subcasearr.result;
    var subid = subcasearr.id;
    var suburl = subcasearr.entry + "?subkey=" + subkey;
    passnum = subresult == "pass" ? passnum + 1 : passnum;
    failnum = subresult == "fail" ? failnum + 1 : failnum;
    var testline = '<div class=\"col-md-3\">\n<div class=\"media ' + subresult + '\">\n'
                  + '<a class=\"pull-left\" href=\"' + suburl + '\">\n'
                  + '<div class=\"' + tbg + '\"><span class=\"' + ticon + '\"></span></div>\n</a>\n'
                  + '<div class=\"media-body\">\n'
                  + '<a href=\"' + suburl +'\"><h5 class=\"media-heading\">' + subid + '</h5></a>\n'
                  + '</div>\n</div>\n</div>\n';
    $('#mytest').append(testline);
  }
  if(passnum == failnum == 0)
    tresult = "";
  else if(tnum == passnum)
    tresult = "pass";
  else
    tresult = "fail";
  var newcasearr = {num:tnum, pass:passnum, fail:failnum, result:tresult, sid:sid};
  lstorage.setItem(tid, JSON.stringify(newcasearr)); //update case result
}

$(document).ready(function(){
  $('#casename').append(tid);
  document.title = tid;

  if(lstorage.getItem(tid + "-num") == null) {
    subcaseStorage();
  }
  listSubcase();
});
