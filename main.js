"use strict";
{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");

  const hoursInput = document.getElementById("hours-input");
  const minutesInput = document.getElementById("minutes-input");
  const secondsInput = document.getElementById("seconds-input");

  const settingDisplay = document.getElementById("setting-display");
  const settingIcon = document.getElementById("setting-icon");

  let intervalId;

  function getTotalTime() {
    const h = Number(hoursInput.value) || 0;
    const m = Number(minutesInput.value) || 0;
    const s = Number(secondsInput.value) || 0;

    return (h * 3600 + m * 60 + s) * 1000;
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
    const totalTime = getTotalTime();
    updateTimerText(totalTime);
  }

  start.addEventListener("click", () => {
    const totalTime = getTotalTime();
    if (totalTime <= 0) {
      return;
    }

    clearInterval(intervalId);

    const endTime = Date.now() + getTotalTime();
    updateTimerText(totalTime);

    intervalId = setInterval(() => {
      const countDown = endTime - Date.now();

      if (countDown <= 0) {
        clearInterval(intervalId);
        updateTimerText(0);
        return;
      }
      updateTimerText(countDown);
    }, 100);
  });

  hoursInput.addEventListener("input", previewTime);
  minutesInput.addEventListener("input", previewTime);
  secondsInput.addEventListener("input", previewTime);
}
