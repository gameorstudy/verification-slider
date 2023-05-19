const cover = document.getElementById("cover");
const sliderArea = document.getElementById("sliderArea");
const indicator = document.getElementById("indicator");
const slider = document.getElementById("slider");
const text = document.getElementById("text");

let isDown;
let startX;
let target;
let correctPosX = 80;

function mouseDown(e) {
  target = e.target.id === "cover" ? "cover" : "slider";
  text.innerHTML = "";
  indicator.classList.add("mouse-down");
  slider.classList.add("mouse-down-slider");
  isDown = true;
  startX = e.x;
}

function mouseMove(e) {
  if (!isDown) {
    return;
  }

  const moveX = e.x - startX;

  if (moveX < 0) {
    cover.style.left = `0px`;
    indicator.style.width = `0px`;
    slider.style.left = `0px`;

    return;
  }

  const exceed = () => {
    cover.style.left = `${sliderArea.clientWidth - cover.clientWidth}px`;
    indicator.style.width = `${sliderArea.clientWidth - slider.clientWidth}px`;
    slider.style.left = `${sliderArea.clientWidth - slider.clientWidth}px`;
  };

  if (target === "cover") {
    if (moveX > sliderArea.clientWidth - cover.clientWidth) {
      exceed();
    } else {
      cover.style.left = `${moveX}px`;
      const coverToSlider =
        (moveX / (sliderArea.clientWidth - cover.clientWidth)) *
        (sliderArea.clientWidth - slider.clientWidth);
      indicator.style.width = `${coverToSlider}px`;
      slider.style.left = `${coverToSlider}px`;
    }
  } else {
    if (moveX > sliderArea.clientWidth - slider.clientWidth) {
      exceed();
    } else {
      slider.style.left = `${moveX}px`;
      const sliderToCover =
        (moveX / (sliderArea.clientWidth - slider.clientWidth)) *
        (sliderArea.clientWidth - cover.clientWidth);
      indicator.style.width = `${moveX}px`;
      cover.style.left = `${sliderToCover}px`;
    }
  }
}

function reset() {
  slider.style.left = "0px";
  slider.classList.remove("mouse-down-slider", "error-slider", "pass-slider");
  cover.style.left = "0px";
  indicator.style.width = "0px";
  indicator.classList.remove("pass", "error", "mouse-down");
  text.innerHTML = "向右拖动滑块填充拼图";
}

function mouseUp() {
  if (!isDown) {
    return;
  }
  isDown = false;

  // 判断是否补全 +-5
  if (Math.abs(parseFloat(cover.style.left.slice(0, -2)) - correctPosX) < 5) {
    indicator.classList.add("pass");
    slider.classList.add("pass-slider");
  } else {
    indicator.classList.add("error");
    slider.classList.add("error-slider");

    setTimeout(() => {
      reset();
    }, 200);
  }
}

cover.addEventListener("mousedown", mouseDown);
window.addEventListener("mousemove", mouseMove);
slider.addEventListener("mousedown", mouseDown);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("mouseup", mouseUp);
