export const playWav = (name: string) => {
  try {
    new Audio(`./${name}.wav`).play();
  } catch(e){
    console.log(e)
  }
}
