let direction={x:0, y:0};
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const bgsound = new Audio('music.mp3');
let speed=5;
let score=0;
let lastpainttime=0;
let snakearr=[
    {x:13, y:15}
];
food={x:6, y:7};

//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime); 
    
    if((ctime - lastpainttime)/1000 < 1/speed)
    {
        return;
    }
   
    lastpainttime=ctime;
    gameengine();
    
    
}

function iscollide(snake){
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameengine(){
    //updating the snake array variable
    if(iscollide(snakearr)){
        gameoversound.play();
        bgsound.pause();
         direction={x:0, y:0};
         alert("Game Over! press any key to restart");
         snakearr=[
            {
                x:13, y:15
            }
           
         ]
         bgsound.play();
         score=0;
         scorebox.innerHTML="Score :" +score;
    }


   //increment score and regenerate food
   
   if(snakearr[0].y=== food.y && snakearr[0].x=== food.x)
   {

      foodsound.play();
      score += 1;   
       if(score>hiscoreval)
       {
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "Hiscore: "+hiscoreval;
       }
      scorebox.innerHTML="Score :" +score;
      snakearr.unshift({x:snakearr[0].x  + direction.x, y:snakearr[0].y+direction.y})
      let a=2;
      let b=16;
      food ={x: Math.round(a+(b-a)* Math.random()),y:Math.round(a + (b-a)*Math.random())}
   
   }

   //moving the snake
   for (let i = snakearr.length - 2; i>=0; i--) {

    snakearr[i+1]={...snakearr[i]};
   }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;
   

    //display the food and snake
   
 //display snake
   board.innerHTML =""; 
   snakearr.forEach((e,index)=>
   {
    snakeele=document.createElement('div');
    snakeele.style.gridRowStart= e.y;
    snakeele.style.gridColumnStart=e.x;
   if(index === 0){
    snakeele.classList.add('head');
   }
   else{
    snakeele.classList.add('snake');
   }
    board.appendChild(snakeele);
   });

    //display food
   foodeele=document.createElement('div');
   foodeele.style.gridRowStart= food.y;
   foodeele.style.gridColumnStart=food.x;
   foodeele.classList.add('food');
   board.appendChild(foodeele);
}

//Main logic starts here



let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore ;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
   
    direction={x:0,y:1};
    movesound.play();
    bgsound.play();
    switch (e.key) 
    {


            case "ArrowUp":
                console.log("ArrowUp");
                direction.x = 0;
                direction.y = -1;
                break;
    
    
        case "ArrowDown":
                console.log("ArrowDown")
                direction.x=0;
                direction.y=1;
                break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            direction.x=-1;
            direction.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            direction.x=1;
            direction.y=0;
            break; 

        default:
            break;
    }
});



















