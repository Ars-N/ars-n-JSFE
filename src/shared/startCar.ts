export function startCar(time:number, $svgCar: HTMLElement) {
  const svgCar = $svgCar;
  setTimeout(() => {
    svgCar.style
      .animation = `drive ${time}s linear forwards`;
    svgCar.firstElementChild.classList.add('car-trtrtr');
  }, 0);
}
