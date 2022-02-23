function game(){
    
    const bird = document.querySelector("div.bird");
    const gameDiv = document.querySelector("div.game");
    let birdHeight = bird.offsetTop;
    let birdJump = -50



    const newObst = setInterval(()=>{
        const windowHeight = randHeight();
        const obstacleBot = document.createElement("div");
        obstacleBot.classList.add("obstacle");
        obstacleBot.style.top = `${windowHeight}px`;
        obstacleBot.style.left = `400px`;
        gameDiv.appendChild(obstacleBot);
        const obstacleTop = document.createElement("div");
        obstacleTop.classList.add("obstacle");
        obstacleTop.style.top = `${windowHeight-150-600}px`;
        obstacleTop.style.left = `400px`;
        gameDiv.appendChild(obstacleTop);
    },1800)
    const obstacles = setInterval(()=>{
        const obsts = gameDiv.querySelectorAll("div.obstacle");
        if(obsts){
            obsts.forEach(obst => {
                const left = [...obst.style.left]
                left.splice((left.length-2),2);
                obst.style.left = `${parseInt(left.join(""))-1}px`;
                if(obst.style.left === "-80px" ) obst.parentNode.removeChild(obst);
            })
        }
    },5)
    function jump(){
        birdJump = -1;
    }
    function randHeight(){
        const rand = Math.floor(Math.random() * 225 + 225);
        return rand;
    }
    gameDiv.addEventListener("click",jump);
}
document.addEventListener("DOMContentLoaded",game);