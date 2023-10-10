"use strict";

var selectTr = null;
var table = document.getElementById("songResult");
var btn = document.getElementById("sendForm");
btn.addEventListener("click", songData);

function songData(e) {
  e.preventDefault();
  console.log("songData()");
  var transferData = readData();
  if (selectTr == null) {
    insertData(transferData);
  } else {
    updateData(transferData);
    selectTr = null;
    document.getElementById("sendForm").value = "Add"; // Reset the button label
  }

  resetData();
}

function readData() {
  var song = {};
  song["author"] = document.getElementById("txtAuthor").value;
  song["title"] = document.getElementById("txtTitle").value;
  song["year"] = document.getElementById("numYear").value;
  return song;
}

function insertData(x) {
  var table = document.getElementById("songResult");
  var tr = table.insertRow(table.length);
  var td1 = tr.insertCell(0);
  var td2 = tr.insertCell(1);
  var td3 = tr.insertCell(2);
  var td4 = tr.insertCell(3);

  td1.innerHTML = x.author;
  td2.innerHTML = x.title;
  td3.innerHTML = x.year;
  td4.innerHTML = `<a class='edt' onClick='editData(this)'>Edit</a> / <a class='dlt' onClick='deleteData(this)'>🗑️</a>`;
}

function resetData() {
  document.getElementById("txtAuthor").value = "";
  document.getElementById("txtTitle").value = "";
  document.getElementById("numYear").value = "";
}

function editData(clickedElement) {
  selectTr = clickedElement.parentElement.parentElement;
  // console.log(selectTr);
  document.getElementById("sendForm").value = "Update"; // Change the button label
  document.getElementById("txtAuthor").value = selectTr.cells[0].innerHTML;
  document.getElementById("txtTitle").value = selectTr.cells[1].innerHTML;
  document.getElementById("numYear").value = selectTr.cells[2].innerHTML;
}

function updateData(song) {
  selectTr.cells[0].innerHTML = song.author;
  selectTr.cells[1].innerHTML = song.title;
  selectTr.cells[2].innerHTML = song.year;
}

function deleteData(clickedElement) {
  const song = clickedElement.parentElement.parentElement.firstChild.innerHTML;
  const message = `Are you 100% sure you want to delete ${song}?`;
  if (confirm(message)) {
    var deleteTr = clickedElement.parentElement.parentElement;
    deleteTr.remove();
  }
  // console.log(deleteTr);
}
