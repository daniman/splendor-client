export const playWav = (name: string) => {
  new Audio(`./${name}.wav`).play();
}
