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
var popup_info;
var lstorage = window.localStorage;
var tid = location.search.split('=')[1];
var casearr = JSON.parse(lstorage.getItem(tid));
var sid = casearr.sid;

function EnablePassButton() {
  $('#pass_button').attr('disabled', false);
}

function DisablePassButton() {
  $('#pass_button').attr('disabled', true);
}

function back() {
  //need to add method to deal with when it is a subcase
  window.location.href = "../../tests_list.html?sid=" + sid;
}

function reportResult(res) {
  var tpass = parseInt(casearr.pass);
  var tfail = parseInt(casearr.fail);
  var tresult = casearr.result;
  var tnum = parseInt(casearr.num);
  if (tnum > 1) {
    //deal with subcase
  } else {
    tresult = res;
  }
  casearr = {num:tnum, pass:tpass, fail:tfail, result:tresult, sid:sid};
  lstorage.setItem(tid, JSON.stringify(casearr));
  back();
}

function initStep(testname) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  var addr = window.location.href;
  var str = addr.substring(0, addr.indexOf("/index.html"));
  script.src = str.replace("/samples/", "/steps/") + "/step.js";
  document.body.appendChild(script);
  script.onload = script.onreadystatechange = null;
  script.onload = script.onreadystatechange = function() {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
      if(typeof step != "undefined") {
        addPassFailButton();
      }
    }
  }
}

function addPassFailButton() {
  $("#footer").html("<button id='pass_button' type='button' class='btn btn-default' onclick='javascript: reportResult(\"pass\");'><span class='glyphicon glyphicon-ok-sign'></span>&nbsp;Pass</button><button type='button' class='btn btn-default' onclick='javascript: reportResult(\"fail\");'><span class='glyphicon glyphicon-remove-sign'></span>&nbsp;Fail</button>" + $("#footer").html());
}

function help() {
  showMessage("help", popup_info);
}

$(document).ready(function(){
  document.title = tid;
  $("#main_page_title").text(tid);
  $("#header").addClass("navbar navbar-default navbar-fixed-top text-center");
  $("#footer").html("<button type='button' id='help' class='btn btn-default' data-toggle='modal' data-target='#popup_info'><span class='glyphicon glyphicon-info-sign'></span>&nbsp;Help</button><button type='button' class='btn btn-default' onclick='javascript: back();'><span class='glyphicon glyphicon-circle-arrow-left'></span>&nbsp;Back</button>");
  $("#footer").addClass("container text-center");
  initStep(tid);
  $("#help").click(help);
  popup_info = $("#popup_info").html();
});
