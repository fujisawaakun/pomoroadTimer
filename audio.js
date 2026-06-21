"use strict";

const workBGM = new Audio("workBGM/healing2.mp3");
const restBGM = new Audio("restBGM/チルアウト.mp3");

const countDownBGM = new Audio("SE/countdown_3sec.mp3");
countDownBGM.volume = 0.2;

workBGM.loop = true;
restBGM.loop = true;
countDownBGM.loop = false;

function setWorkBGMSrc(src) {
  workBGM.pause();
  workBGM.currentTime = 0;
  workBGM.src = src;
  workBGM.load();
}

function setRestBGMSrc(src) {
  restBGM.pause();
  restBGM.currentTime = 0;
  restBGM.src = src;
  restBGM.load();
}

//workタイムに流すBGM
function playWorkBGM() {
  restBGM.pause(); //restBGMをストップ
  restBGM.currentTime = 0; //restBGMを初期化

  //workBGMの再生
  // workBGM.currentTime = 0; //workBGMを初期化
  workBGM.play().catch((error) => {
    console.log("workBGM再生失敗", error); //workBGMが失敗した際のエラーメッセージ
  });
}

//restタイムに流すBGM
function playRestBGM() {
  workBGM.pause(); //workBGMをストップ
  workBGM.currentTime = 0; //workBGMを初期化

  //restBGMの再生
  // restBGM.currentTime = 0; //restBGMを初期化
  restBGM.play().catch((error) => {
    console.log("restBGM再生失敗", error); //restBGMが失敗した際のエラーメッセージ
  });
}

function pauseAllBGM() {
  workBGM.pause();
  restBGM.pause();
  countDownBGM.pause();
}

function resetAllBGM() {
  workBGM.pause();
  restBGM.pause();
  countDownBGM.pause();

  workBGM.currentTime = 0;
  restBGM.currentTime = 0;
  countDownBGM.currentTime = 0;
}

function updateVolume(volume, volumeValue) {
  workBGM.volume = volume;
  restBGM.volume = volume;

  volumeValue.textContent = `${Math.round(volume * 100)}`;
}

function setCurrentModeVolume(mode, volume) {
  if (mode === "work") {
    workBGM.volume = volume;
    return;
  }

  if (mode === "rest") {
    restBGM.volume = volume;
    return;
  }
}

function playCountDownBGM() {
  countDownBGM.currentTime = 0;
  countDownBGM.play().catch((error) => {
    console.log("countDownBGM再生失敗", error);
  });
}

function resumeCountdownBGM() {
  countDownBGM.play().catch((error) => {
    console.log("countDownBGM再生失敗", error);
  });
}
