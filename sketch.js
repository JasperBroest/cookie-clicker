let cookies = 0;
let defaultAddAmount = 1;
let cursorAddAmount = 0.1;
let grandmaAddAmount = 1;
let farmAddAmount = 5;
let mineAddAmount = 10; 


//images
let backgroundImg;
let cookieImg;
let cursorImg;
let grandmaImg;
let farmImg;
let mineImg;
let cursorUpgradeImg;


//building counts
let cursorCount = 0;
let grandmaCount = 0;
let farmCount = 0;
let mineCount = 0;


let resetButton;


//upgrades
let cursorUpradeCost = 750;
let grandmaUpgradeCost = 1500;

//upgrades bought
let alreadyBought = [false ,false, false ,false];

//prices
let cursorCost = 15;
let grandmaCost = 100;
let farmCost = 1000;
let mineCost = 3500;


function preload(){
  backgroundImg = loadImage("assets/ccBackground.jpeg")


  if(localStorage.getItem('cookies') != null) cookies = parseFloat(localStorage.getItem('cookies'));

  if(localStorage.getItem('defaultAddAmount') != null) defaultAddAmount = parseInt(localStorage.getItem('defaultAddAmount'))
   if(localStorage.getItem('cursorAddAmount') != null) cursorAddAmount = parseFloat(localStorage.getItem('cursorAddAmount'))
   if(localStorage.getItem('grandmaAddAmount') != null) grandmaAddAmount = parseInt(localStorage.getItem('grandmaAddAmount'))
   if(localStorage.getItem('farmAddAmount') != null) farmAddAmount = parseInt(localStorage.getItem('farmAddAmount'))
   if(localStorage.getItem('mineAddAmount') != null) mineAddAmount = parseInt(localStorage.getItem('mineAddAmount'))

   if(localStorage.getItem('cursorCount') != null) cursorCount = parseInt(localStorage.getItem('cursorCount'))
   if(localStorage.getItem('grandmaCount') != null) grandmaCount = parseInt(localStorage.getItem('grandmaCount'))
   if(localStorage.getItem('farmCount') != null) farmCount = parseInt(localStorage.getItem('farmCount'))
   if(localStorage.getItem('mineCount') != null) mineCount = parseInt(localStorage.getItem('mineCount'))

   if(localStorage.getItem('alreadyBought') != null) alreadyBought = parseInt(localStorage.getItem('alreadyBought'))

   if(localStorage.getItem('cursorCost') != null) cursorCost = parseInt(localStorage.getItem('cursorCost'))
   if(localStorage.getItem('grandmaCost') != null) grandmaCost = parseInt(localStorage.getItem('grandmaCost'))
   if(localStorage.getItem('farmCost') != null) farmCost = parseInt(localStorage.getItem('farmCost'))
   if(localStorage.getItem('mineCost') != null) mineCost = parseInt(localStorage.getItem('mineCost'))


  if (isNaN(cookies)){
    cookies = 0
  }
  
}

function setup() {
  createCanvas(700, 700);
  
  cursorUpgradeImg = createImg("assets/cursorUpgrade.png")
  cursorUpgradeImg.size(0, 0)
  grandmaUpgradeImg = createImg("assets/grandmaUpgrade.webp")
  grandmaUpgradeImg.size(0, 0)

  //the mighty cookie
  cookieImg = createImg("assets/Cookie_JE2_BE2.webp")
  cookieImg.position(100, 300)
  cookieImg.size(150, 150)
  cookieImg.style('user-select', 'none')
  cookieImg.mousePressed(function(){cookies += Math.floor(defaultAddAmount)})

  //reset button
  resetButton = createButton('reset')
  resetButton.position(0, 678)
  resetButton.style('user-select', 'none')
  resetButton.mousePressed(function () {cookies = 0})


//buildings

  cursorImg = createImg("assets/cursor.png")
  cursorImg.position(575, 80)
  cursorImg.size(80, 100)
  cursorImg.style('user-select', 'none')
  cursorImg.mousePressed(function(){
    if (cookies >= cursorCost){
      defaultAddAmount += cursorAddAmount;
      cookies -= cursorCost;
      cursorCost += cursorCost / 4;
      // cursorImg.remove()
      cursorCount++;
    }
  })

  grandmaImg = createImg("assets/grandma.jpg")
  grandmaImg.position(575, 240)
  grandmaImg.size(100, 100)
  grandmaImg.style('user-select', 'none')
  grandmaImg.mousePressed(function(){
    if (cookies >= grandmaCost){
      defaultAddAmount += grandmaAddAmount;
      cookies -= grandmaCost;
      grandmaCost += grandmaCost / 4;
      grandmaCount++;

    }
  })

  farmImg = createImg("assets/farm.webp")
  farmImg.position(575, 360)
  farmImg.size(100, 100)
  farmImg.style('user-select', 'none')
  farmImg.mousePressed(function(){
    if (cookies >= farmCost){
      defaultAddAmount += 5;
      cookies -= farmCost;
      farmCost += farmCost / farmAddAmount;
      farmCount++;
    }
  })

  mineImg = createImg("assets/mine.webp")
  mineImg.position(575, 520)
  mineImg.size(100, 100)
  mineImg.style('user-select', 'none')
  mineImg.mousePressed(function(){
    if (cookies >= mineCost){
      defaultAddAmount += mineAddAmount;
      cookies -= mineCost;
      mineCost += mineCost / 4;
      mineCount++;
    }
  })

  

}

function draw() {
  image(backgroundImg, 0, 0, 1400, 700)

  push()
  textSize(28)
  fill('white')
  stroke(0)
  strokeWeight(5)
  text(`Cookies: ${Math.floor(cookies)}`, 300, 50);
  pop()
  push()
  textSize(20)
  fill('white')
  stroke(0)
  strokeWeight(3)


  let cpc = `cookie per click: ${nf(defaultAddAmount, undefined, 1)}`
  // if (defaultAddAmount % 1 != 0){
  //   cpc = `cookie per click: ${nf(defaultAddAmount, undefined, 0)}`
  // }
  text(cpc, 50, 250)
  pop()

  //building text
  push()
  fill('white')
  stroke(0)
  strokeWeight(3)
  textSize(20)
  text(`Cost: ${Math.floor(cursorCost)}`, 480, 135)
  text(`Cost: ${Math.floor(grandmaCost)}`, 470, 280)
  text(`Cost: ${Math.floor(farmCost)}`, 470, 420)
  text(`Cost: ${Math.floor(mineCost)}`, 470, 565)
  //add amount text
  text(`+${cursorAddAmount}`, 500, 160)
  text(`+${grandmaAddAmount}`, 500, 305)
  text(`+${farmAddAmount}`, 500, 445)
  text(`+${mineAddAmount}`, 500, 590)

  //building counts
  textSize(30)
  strokeWeight(5)
  text(cursorCount, 608, 60)
  text(grandmaCount, 612, 220)
  text(farmCount, 612, 380)
  text(mineCount, 612, 510)
  pop()


  //upgrade button
  if (cursorCount >= 10 && alreadyBought[0] == false){
    cursorUpgradeImg.position(100, 90)
    cursorUpgradeImg.size(100, 100)
    cursorUpgradeImg.mousePressed(function(){
      if (cookies >= cursorUpradeCost){
        alreadyBought[0] = true;
        cursorAddAmount += 0.4
        this.remove()
      }
    })
  }
  if (grandmaCount >= 10 && alreadyBought[1] == false){
    grandmaUpgradeImg.position(100, 90)
    grandmaUpgradeImg.size(100, 100)
    grandmaUpgradeImg.mousePressed(function(){
      if (cookies >= grandmaUpgradeCost){
        alreadyBought[1] = true;
        grandmaAddAmount += 4
        this.remove()
      }
    })
  }
  //item storing
  localStorage.setItem('cookies', cookies);

  localStorage.setItem('defaultAddAmount', defaultAddAmount);
  localStorage.setItem('cursorAddAmount', cursorAddAmount);
  localStorage.setItem('grandmaAddAmount', grandmaAddAmount);
  localStorage.setItem('farmAddAmount', farmAddAmount);
  localStorage.setItem('mineAddAmount', mineAddAmount);

  localStorage.setItem('cursorCount', cursorCount);
  localStorage.setItem('grandmaCount', grandmaCount);
  localStorage.setItem('farmCount', farmCount);
  localStorage.setItem('mineCount', mineCount);

  localStorage.setItem('alreadyBought', alreadyBought);

  localStorage.setItem('cursorCost', cursorCost);
  localStorage.setItem('grandmaCost', grandmaCost);
  localStorage.setItem('farmCost', farmCost);
  localStorage.setItem('mineCost', mineCost);
}


//parseInt() maakt van een string een nummer
//setInterval() voor elke seconde + het aantal cookies