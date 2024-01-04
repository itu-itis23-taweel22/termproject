const surname = "taweel"
let answer=""
const resetButton = document.getElementById('reset');
const score = document.getElementById('score');
let gameOver = document.getElementById('game-over');
gameOver.style.visibility = "hidden"
resetButton.style.display="none"
let src = [ "letters/t-letter.svg", "/memory-game/letters/a-letter.svg","letters/a-letter.svg", "letters/w-letter.svg","letters/e-letter.svg", "letters/l-letter.svg" ]
const lettersImages = document.getElementById("images-container").children
let valuesofImages = [ 't', 'a', 'w' ,'e' ,'e' ,'l' ]
const start = document.getElementById('start')
start.addEventListener('click',startGame)
for(let image of lettersImages){
    image.addEventListener('click', ()=>{
        checkImage(image)
    })
}
resetButton.addEventListener('click',reset)



function randomizeImages (){
    for(let i = 0; i < 1000 ; i++){
        
        const firstRandomNumber = parseInt( Math.random() * src.length )
        const secondRandomNumber = parseInt( Math.random() * src.length )
        const firstChangedSrc = src[firstRandomNumber]
        const firstChangedValue = valuesofImages[firstRandomNumber] 
        src[firstRandomNumber] = src[secondRandomNumber]
        src[secondRandomNumber] = firstChangedSrc
        valuesofImages[firstRandomNumber] = valuesofImages[secondRandomNumber]
        valuesofImages [secondRandomNumber] = firstChangedValue
    }
}
function startGame(){
    randomizeImages()
    for(let i = 0; i < src.length; i++){
        start.style = 'display:none;'
        resetButton.style.display = "none"
        gameOver.style.visibility = "hidden"
        lettersImages[i].src = src[i]
        lettersImages[i].setAttribute('value',valuesofImages[i])
        setTimeout(
            function() {
                for(let i = 0; i < lettersImages.length; i++){
                    lettersImages[i].style.visibility = "hidden"
                    lettersImages[i].style = "background-color: black;"
                }
            }, 2000);
    }

}
function checkImage(image){
    if( resetButton.style.display  =='none' && image.style.backgroundColor === 'black'){
        if(image.getAttribute('value') == surname[answer.length]){
            answer += image.getAttribute('value')
            image.style.visibility = "visible"
            image.style.backgroundColor = ""
            score.innerText = `Score: ${parseInt(answer.length *100/6)}`    
        }else{
            gameOver.style.visibility = "visible"
            resetButton.style.display = "inline"
        }
    }

} 
function reset(){
    answer = ""
    score.innerText = "Score:"
    for(let i = 0; i < lettersImages.length; i++){
        lettersImages[i].style.visibility = "visible"
        lettersImages[i].style.backgroundColor = ""
    }
    startGame()
}