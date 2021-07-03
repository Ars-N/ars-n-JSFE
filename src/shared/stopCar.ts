export function stopCarAnimation($svgCar: HTMLElement) {
  const svgCar = $svgCar;
  setTimeout(() => {
    svgCar.style
      .animation = 'none';
    svgCar.firstElementChild.classList.remove('car-trtrtr');
  }, 0);
}
