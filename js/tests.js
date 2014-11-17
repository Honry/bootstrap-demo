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

function addPassFailButton() {
  $("#footer").html("<button id='pass_button' type='button' class='btn btn-default' onclick='javascript: reportResult(\"pass\");'><span class='glyphicon glyphicon-ok-sign'></span>&nbsp;Pass</button><button type='button' class='btn btn-default' onclick='javascript: reportResult(\"fail\");'><span class='glyphicon glyphicon-remove-sign'></span>&nbsp;Fail</button>" + $("#footer").html());
}

$(document).ready(function(){
  document.title = tid;
  $("#main_page_title").text(tid);
  $("#header").addClass("navbar navbar-default navbar-fixed-top text-center");
  $("#footer").html("<button type='button' class='btn btn-default' data-toggle='modal' data-target='#myModal'><span class='glyphicon glyphicon-info-sign'></span>Help</button><button type='button' class='btn btn-default' onclick='javascript: back();'><span class='glyphicon glyphicon-circle-arrow-left'></span>Back</button>");
  if(step) {
    addPassFailButton();
  }
  $("#footer").addClass("container text-center");
});
