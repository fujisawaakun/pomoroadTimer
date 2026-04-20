"use strict";
{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");

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

  function getWorkTotalTime() {
    const h = Number(hoursWork.value) || 0;
    const m = Number(minutesWork.value) || 0;
    const s = Number(secondsWork.value) || 0;

    return (h * 3600 + m * 60 + s) * 1000;
  }

  function getRestTotalTime() {
    const h = Number(hoursRest.value) || 0;
    const m = Number(minutesRest.value) || 0;
    const s = Number(secondsRest.value) || 0;

    return (h * 3600 + m * 60 + s) * 1000;
  }

  function getSetCount() {
    return Number(setCount.value) || 1;
  }

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

  function previewTime() {
    const totalTime = getWorkTotalTime();
    updateTimerText(totalTime);
  }

  function startCountdown(totalTime, finish) {
    if (totalTime <= 0) {
      finish();
      return;
    }

    clearInterval(intervalId);

    const endTime = Date.now() + totalTime;
    updateTimerText(totalTime);

    intervalId = setInterval(() => {
      const countDown = endTime - Date.now();

      if (countDown <= 0) {
        clearInterval(intervalId);
        updateTimerText(0)
        finish();
        return;
      }

      updateTimerText(countDown);
    }, 100);
  }

  function startWork() {
    startCountdown(getWorkTotalTime(), () => {

      if (currentSet >= getSetCount()) {
        return;
      }
      startRest();
    });
  }
  function startRest() {
    startCountdown(getRestTotalTime(), () => {
      currentSet++;
      startWork();
    });
  }

  start.addEventListener('click', () => {
    if (getWorkTotalTime() <= 0) {
    return;
  }

    currentSet = 1;
    startWork();
  })

  hoursWork.addEventListener("input", previewTime);
  minutesWork.addEventListener("input", previewTime);
  secondsWork.addEventListener("input", previewTime);
}
