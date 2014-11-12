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
        Liu, Yun <yunx.liu@intel.com>
*/

function EnablePassButton(){
  $('#pass_button').attr('disabled',false);
}

function DisablePassButton(){
  $('#pass_button').attr('disabled',true);
}

function getParms() {
  var parms = new Array();
  var str = location.search.substring(1);
  var items = str.split('&');
  for ( var i = 0; i < items.length; i++) {
    var pos = items[i].indexOf('=');
    if (pos > 0) {
      var key = items[i].substring(0, pos);
      var val = items[i].substring(pos + 1);
      if (!parms[key]) {
        var rawVal = decodeURI(val);
        if (rawVal.indexOf(',') < 0)
          parms[key] = rawVal;
        else
          parms[key] = rawVal.split(',');
      }
    }
  }
  return parms["test_name"];
}

function addButton() {
  $("#footer").html("<button id='pass_button' type='button' class='btn btn-default' onclick='javascript: pass();'><span class='glyphicon glyphicon-ok-sign'></span>Pass</button><button type='button' class='btn btn-default' onclick='javascript: fail();'><span class='glyphicon glyphicon-remove-sign'></span>Fail</button>" + $("#footer").html());
}

function pass() {
  var testname = getParms();
  window.sessionStorage.setItem(testname, 1);
}

function fail() {
  var testname = getParms();
  window.sessionStorage.setItem(testname, 0);
}

function back() {
  
}

$(document).ready(function(){
  var testname = getParms();
  document.title = testname;
  $("#main_page_title").text(testname);
  window.sessionStorage.setItem(testname, -1);
  $("#header").addClass("navbar navbar-default navbar-fixed-top text-center");
  $("#footer").html("<button type='button' class='btn btn-default' data-toggle='modal' data-target='#myModal'><span class='glyphicon glyphicon-info-sign'></span>Help</button><button type='button' class='btn btn-default' onclick='javascript: back();'><span class='glyphicon glyphicon-circle-arrow-left'></span>Back</button>");
  $("#footer").addClass("container text-center");
  $("#myModal").html("<div class='modal-dialog' style='padding-top:600px;'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button></div><div id='modal-body' class='modal-body'></div><div class='modal-footer'></div></div></div>");
});
