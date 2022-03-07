function game(){
    
    const bird = document.querySelector("div.bird");
    const gameDiv = document.querySelector("div.game");
    const background = document.querySelector("div.background");

    let birdHeight = bird.offsetTop;
    let birdJump = -50
    let score = 0;
    function falling() {
        if(!(birdHeight < 570)) gameOver()
        birdHeight += 1;
        bird.style.top =`${birdHeight}px`; 
    }
    ()=>{
        if(birdJump<=1 && birdJump>=-5 && (birdHeight - (-((1/2)*(birdJump*birdJump))))> 0 ) {
            birdHeight -= (-((1/2)*(birdJump*birdJump)+1));
            birdJump += 0.1
        }
        else birdHeight += 0.6;
        if(birdHeight>=600){
            clearInterval(gravity)
        }
        else{
            bird.style.top = `${birdHeight}px`;
        }
    }
    let gravity = setInterval(falling,5)

    const newObst = setInterval(()=>{
        const windowHeight = randHeight();
        const obstacleBot = document.createElement("div");
        obstacleBot.classList.add("obstacle");
        obstacleBot.style.top = `${windowHeight}px`;
        obstacleBot.style.left = `400px`;
        obstacleBot.id = `${windowHeight}`;
        gameDiv.appendChild(obstacleBot);
        const obstacleTop = document.createElement("div");
        obstacleTop.classList.add("obstacle");
        obstacleTop.classList.add("top");
        obstacleTop.style.top = `${windowHeight-150-600}px`;
        obstacleTop.style.left = `400px`;
        obstacleTop.id = `${windowHeight-150}`;
        gameDiv.appendChild(obstacleTop);
    },1800);
    const obstacles = setInterval(()=>{
        const obsts = gameDiv.querySelectorAll("div.obstacle");
        const obstsTop = gameDiv.querySelectorAll("div.top");
        if(obsts){
            obsts.forEach(obst => {
                const left = [...obst.style.left]
                left.splice((left.length-2),2);
                obst.style.left = `${parseInt(left.join(""))-1}px`;
                if(obst.style.left === "-80px" ) obst.parentNode.removeChild(obst);
            })
            obstsTop.forEach(obst=>{
                if(obst.offsetLeft <= 190 && obst.offsetLeft >= 70) checkColision(obst.id);
                if(bird.offsetLeft === obst.offsetLeft+81 ) updateScore()
            })
        }
    },5);
    const cloudGenerator = setInterval(()=>{
        const cloud = newCloud();
        background.appendChild(cloud);
    },1000);
    const backgroundFlow = setInterval(()=>{
        const clouds = background.querySelectorAll("div.cloud");
        if(clouds.length){
            clouds.forEach(cl=>{
                const left = [...cl.style.left];
                left.splice((left.length-2),2);
                const width = [...cl.style.width];
                width.splice((width.length-2),2);
                cl.style.left = `${parseInt(left.join(""))- 1}px`;
                if(cl.style.left === `-${cl.style.width}`) cl.remove()
            })
        }
    },10)
    function newCloud() {
        const cloud = document.createElement("div");
        const width = randomValue(100,50);
        cloud.classList.add("cloud");
        cloud.style.width = `${width}px`;
        cloud.style.height = `${width / 2}px`;
        cloud.style.left = "400px";
        cloud.style.top = `${randomValue(100,0)}px`
        return cloud;
    }
    function randomValue(range, start){
        return Math.floor(Math.random() * range + start);
    }
    function jump(){
        clearInterval(gravity)
        bird.style.top = `${birdHeight - 90}px`;
        birdHeight -= 90;
        gravity = setInterval(falling,5)
    }
    function randHeight(){
        const rand = Math.floor(Math.random() * 225 + 225);
        return rand;
    }
    function checkColision(topVal){
        if(bird.offsetTop <= parseInt(topVal) || (bird.offsetTop+30) >= (parseInt(topVal)+150)) gameOver();
    }
    function gameOver(){
        clearInterval(newObst);
        clearInterval(obstacles);
        clearInterval(gravity)
        gameDiv.removeEventListener("click",jump)
    }
    function updateScore(){
        const board = document.querySelector("div.score");
        board.textContent = '';
        board.textContent = ++score;
    }
    gameDiv.addEventListener("click",jump);
}
document.addEventListener("DOMContentLoaded",game);