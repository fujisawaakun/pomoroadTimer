"use strict";
{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");

  const progress = document.getElementById("progress");
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  progress.style.strokeDasharray = circumference;
  progress.style.strokeDashoffset = 0;

  const hoursWork = document.getElementById("hours-work");
  const minutesWork = document.getElementById("minutes-work");
  const secondsWork = document.getElementById("seconds-work");

  const hoursRest = document.getElementById("hours-rest");
  const minutesRest = document.getElementById("minutes-rest");
  const secondsRest = document.getElementById("seconds-rest");

  const setCount = document.getElementById("set-count");

  const settingDisplay = document.getElementById("setting-display");
  const settingIcon = document.getElementById("setting-icon");

  let intervalId;
  let currentSet = 1;
  let isRunning = false;
  let remainingTime = 0;
  let currentMode = 'work';

  //work-timerのinputに入力された数値を取得、ミリ秒に変換
  function getWorkTotalTime() {
    const h = Number(hoursWork.value) || 0;
    const m = Number(minutesWork.value) || 0;
    const s = Number(secondsWork.value) || 0;

    return (h * 3600 + m * 60 + s) * 1000;
  }

  //rest-timerのinputに入力された数値を取得、ミリ秒に変換
  function getRestTotalTime() {
    const h = Number(hoursRest.value) || 0;
    const m = Number(minutesRest.value) || 0;
    const s = Number(secondsRest.value) || 0;

    return (h * 3600 + m * 60 + s) * 1000;
  }

  //set-countのinputに入力された数値を取得
  function getSetCount() {
    return Number(setCount.value) || 1;
  }

  //受け取った数値を時・分・秒に分割、timerのテキストに表示
  function updateTimerText(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = Math.floor(totalSec % 60);

    timer.textContent =
      `${String(hh).padStart(1, "0")}:` +
      `${String(mm).padStart(2, "0")}:` +
      `${String(ss).padStart(2, "0")}`;
  }

  function updateRing(remainingTime, totalTime) {
    if (totalTime <= 0) {
      progress.style.strokeDashoffset = circumference;
      return;
    }

    const ratio = remainingTime / totalTime;
    const offset = circumference * (1 - ratio);

    progress.style.strokeDashoffset = offset;
  }

  function previewTime() {
    const totalTime = getWorkTotalTime();
    updateTimerText(totalTime);
    updateRing(totalTime, totalTime);
  }

  function startCountdown(totalTime, finish) {
    if (totalTime <= 0) {
      finish();
      return;
    }

    clearInterval(intervalId);

    const endTime = Date.now() + totalTime;
    remainingTime = totalTime;
    isRunning = true;
    start.textContent = "停止";

    updateTimerText(totalTime);
    updateRing(totalTime, totalTime);

    intervalId = setInterval(() => {
      const countDown = endTime - Date.now();
      remainingTime = countDown;

      if (countDown <= 0) {
        clearInterval(intervalId);
        remainingTime = 0;
        isRunning = false;
        start.textContent = 'start';
        updateTimerText(0);
        updateRing(0, totalTime);
        finish();
        return;
      }

      updateTimerText(countDown);
      updateRing(countDown, totalTime);
    }, 45);
  }

  function startWork() {
    currentMode = 'work';

    startCountdown(getWorkTotalTime(), () => {
      if (currentSet >= getSetCount()) {
        return;
      }

      startRest();
    });
  }
  function startRest() {
    currentMode = 'rest';

    startCountdown(getRestTotalTime(), () => {
      currentSet++;
      startWork();
    });
  }

  function resumeCountdown() {
    
  }

  start.addEventListener("click", () => {
    if (isRunning === true) {
      clearInterval(intervalId);
      isRunning = false;
      start.textContent = 'start';
      return;
    }

    if (getWorkTotalTime() <= 0) {
      return;
    }

    currentSet = 1;
    startWork();
  });

  hoursWork.addEventListener("input", previewTime);
  minutesWork.addEventListener("input", previewTime);
  secondsWork.addEventListener("input", previewTime);
  previewTime();
}
