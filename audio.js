"use strict";

const workBGM = new Audio("workBGM/優しく穏やかな音楽.mp3");
const restBGM = new Audio("restBGM/チルアウト.mp3");

workBGM.loop = true;
restBGM.loop = true;

//workタイムに流すBGM
function playWorkBGM() {
  restBGM.pause(); //restBGMをストップ
  restBGM.currentTime = 0; //restBGMを初期化

  //workBGMの再生
  workBGM.play().catch((error) => {
    console.log("workBGM再生失敗", error); //workBGMが失敗した際のエラーメッセージ
  });
}

//restタイムに流すBGM
function playRestBGM() {
  workBGM.pause(); //workBGMをストップ
  workBGM.currentTime = 0; //workBGMを初期化

  //restBGMの再生
  restBGM.play().catch((error) => {
    console.log("restBGM再生失敗", error); //restBGMが失敗した際のエラーメッセージ
  });
}

function pauseAllBGM() {
  workBGM.pause();
  restBGM.pause();
}

function resetAllBGM() {
  workBGM.pause();
  restBGM.pause();

  workBGM.currentTime = 0;
  restBGM.currentTime = 0;
}
