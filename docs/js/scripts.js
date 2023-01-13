const gameContainerElement = document.getElementById('game')
const paperElement = document.getElementById('paper')
const scissorsElement = document.getElementById('scissors')
const rockElement = document.getElementById('rock')
const playsOptions = ['paper','scissors','rock']


const randomPlay = () =>{
  console.log(playsOptions[Math.floor(Math.random()*playsOptions.length)]);

}
const printResult = () =>{
  
}



gameContainerElement.addEventListener('click',(ev)=>{
  console.log('Has pulsado ' + ev.target.id)
  randomPlay()

})


