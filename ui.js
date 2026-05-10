'use strict';

  //受け取った数値を時・分・秒に分割、timerのテキストに表示
  function updateTimerText(timer,ms) {
    const totalSec = Math.ceil(ms / 1000);
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = Math.floor(totalSec % 60);

    timer.textContent =
      `${String(hh).padStart(1, "0")}:` +
      `${String(mm).padStart(2, "0")}:` +
      `${String(ss).padStart(2, "0")}`;
  }

  function updateRing(progress, circumference, remainingTime, totalTime) {
    if (totalTime <= 0) {
      progress.style.strokeDashoffset = circumference;
      return;
    }

    const ratio = remainingTime / totalTime;
    const offset = circumference * (1 - ratio);

    progress.style.strokeDashoffset = offset;
  }

    function updateStartIcon(startIconPath, date) {
    if (date === "play") {
      startIconPath.setAttribute("d", "M8 5v14l11-7z");
    }
    if (date === "pause") {
      startIconPath.setAttribute("d", "M6 5h4v14H6zm8 0h4v14h-4z");
    }
  }

    function inputsDisabled(allInputs, isDisabled) {
    allInputs.forEach((input) => {
      input.disabled = isDisabled;
    });
  }