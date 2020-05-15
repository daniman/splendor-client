export const playWav = (name) => {
  new Audio(`./${name}.wav`).play();
}
