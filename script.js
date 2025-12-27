document.addEventListener("DOMContentLoaded", () => {
  const scenes = document.querySelectorAll(".scene");
  const dots = document.querySelectorAll(".dot");
  const wallpaper = document.querySelector(".wallpaper");

  let current = 0, locked = false;

  wallpaper.style.backgroundImage = `url('${scenes[0].dataset.bg}')`;

  function setScene(i) {
    if (locked || i === current) return;
    locked = true;

    scenes[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = i;

    scenes[current].classList.add("active");
    dots[current].classList.add("active");
    wallpaper.style.backgroundImage = `url('${scenes[current].dataset.bg}')`;

    setTimeout(() => locked = false, 1000);
  }

  window.addEventListener("wheel", (e) => {
    if (locked) return;
    if (e.deltaY > 40 && current < scenes.length - 1) setScene(current + 1);
    else if (e.deltaY < -40 && current > 0) setScene(current - 1);
  });

  dots.forEach((dot, i) => dot.addEventListener("click", () => setScene(i)));


  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    scenes[current].querySelectorAll(".obj").forEach(obj => {
      let depth = obj.classList.contains("depth-slow") ? 0.5 :
                  obj.classList.contains("depth-fast") ? 1.7 : 1;
      obj.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
});
