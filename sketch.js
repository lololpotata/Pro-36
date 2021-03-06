//Create variables here
var database
var foodS, foodStock
var dogImg, dogImg1, dog
var feed, addFood
var fedTime, lastFed
var foodObj
function preload()
{
  //load images here
  dogImg1 = loadImage("dogImg1.png")
  dogImg = loadImage("dogImg.png")
}

function setup() {
  
  database = firebase.database()
  
  createCanvas(1200, 500);
  dog = createSprite(1000, 300, 10, 10)
  dog.addImage(dogImg)
  dog.scale = 0.3

  foodStock1 = database.ref('Food');
  foodStock1.on("value", readStock)
  foodObj = new Food()
  
  feed = createButton("Feed Dog")
  feed.position(800, 35)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(900, 35)
  addFood.mousePressed(addFoodS)
 
}


function draw() {  
  background(rgb(46, 139, 87))
  foodObj.getFoodStock();
  foodObj.display()
  
  fedTime = database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed = data.val()
  })
  
  drawSprites();
  
  textSize(20)
    stroke("black")
    fill("white")
    text("FOOD LEFT : " + foodS, 100, 30)
    if(lastFed >= 12){
      text("Last Feed : " + lastFed%12 + "PM", 350, 30);
    }else if(lastFed === 0){
      text("Last Feed : 12 PM", 350, 30);
    }else {
      text("Last Feed : " + lastFed + "AM", 350, 30);
    }
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x){

if(x<= 0 ){
  x =0
} else {
x = x-1
}
  database.ref('/').update({
  Food: x
})
}
function addFoodS(){
dog.addImage(dogImg)
  foodS ++
database.ref('/').update({
  Food: foodS
})
}
function feedDog(){
  dog.addImage(dogImg1)
 
  //food1 = foodObj.getFoodStock()
  //console.log(foodObj.getFoodStock())
  //foodObj.updateFoodStock(food1-1),
  database.ref('/').update({
    Food: foodObj.getFoodStock()-1,
    FeedTime: hour()
  })
   foodObj.getFoodStock();
  foodObj.display();
}
function feed1(){
  console.log(foodObj.getFoodStock())
  foodleft = foodObj.getFoodStock() -1;
  foodObj.deductFood(foodleft);
}