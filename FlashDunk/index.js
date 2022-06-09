let basket;
let bg;
let bg2;

// Variaveis para as bolas
let intervalo = 1000;
let tempo = 0;
let osInimigosBola = [];
let circDiam = 90;

// Variaveis para a camara
var aCaptura;
var aLargura = 620;
var aAltura = 480;

// Variaveis para a interação usando o nariz
let poseNet;
let noseX = 0;
let noseY = 0;

// Variaveis relativas ao jogo
let pontos = 0;

let lastPoints;
let gameOver;
let vidas = 3;
var pontuacao=[];
let tela = 0;

// Botao Play
var largura = 100;
var altura = 120;
var xMenu = 560;
var yMenu1 = 290;

// Botao Recordes
var largura1 = 100;
var altura1 = 120;
var xMenu1 = 1000;
var yMenu2 = 370;

// Botao Back
var largura2 = 50;
var altura2 = 50;
var xMenu2 = 20;
var yMenu3 = 20;

// Variaveis para o texto dos nomes dos alunos no rodape
var textoX = 1240;
var textoY = 475;


// Função Preload que carrega todos os assets necessários para o jogo
function preload()
{
    basket = loadImage("assets/basket.png");
    bg = loadImage("assets/bg.jpg");
    bg2 = loadImage("assets/bg2.jpg");
    bg3 = loadImage("assets/bg3.jpg");
    bg4 = loadImage("assets/bg4.jpg");
    bg5 = loadImage("assets/bg5.png");
    button1 = loadImage("assets/botao2.png");
    button2 = loadImage("assets/botao3.png");
    button3 = loadImage("assets/botao4.png");
    button4 = loadImage("assets/botao5.png");
    button5 = loadImage("assets/botao6.png");
    txt1 = loadImage("assets/text1.png");
    logo = loadImage("assets/logoDesporto.png");
    bola = loadImage("assets/bola.png");
    board1 = loadImage("assets/board1.png");
    board2 = loadImage("assets/board1.1.png");
    life1 = loadImage("assets/life1.png");
    mira = loadImage('assets/mira.png');
    record = loadImage("assets/record.png");
    recordletter = loadImage("assets/recordletter.png");

    fonteTexto = loadFont("assets/Fonts/VARSITY_REGULAR.ttf");
    fonteTexto1 = loadFont("assets/Fonts/TASTY DONUTS.otf");

    soundFormats('mp3', 'wav', 'ogg');

    soundClick = loadSound('assets/audio/buttonpress.mp3');
    soundLife = loadSound('assets/audio/life.mp3');
    soundMusic = loadSound('assets/audio/musicSound.mp3');
    soundBuzzer = loadSound('assets/audio/buzzerSound.mp3');
    soundBasket = loadSound('assets/audio/basketSound.mp3');
}


function setup()
{
    //Criação da camara no nosso ecra com a altura e largura defenidas com as variaveis criadas
    aCaptura = createCapture({
        audio: false,
        video: {
            width: aLargura,
            height: aAltura,
        }
    }, function()
    {
        console.log("Pronto para a captura");
    });
    aCaptura.size(aLargura, aAltura);
    aCaptura.hide();

    // Relaciona o poseNet com a nossa camara e utiliza a função gotPoses onde é estabelecido o nariz
    poseNet = ml5.poseNet(aCaptura, modelReady);
    poseNet.on('pose', gotPoses);

    createCanvas(aLargura * 2, aAltura);
    initJogo();

    soundMusic.setVolume(0.1);

}

// Estabelece/Reseta tudo no jogo quando o gameOver é verdadeiro
function initJogo()
{
    pontos = 0;
    vidas = 3;
    tela = 0;
    desenhaBola();
    gameOver = false;
}

function modelReady() 
{
  console.log('model ready');
}

// Função relativa a interação com o nariz
function gotPoses(poses)
{
    if(poses.length > 0)
    {
        //Nariz
        noseX = poses[0].pose.keypoints[0].position.x;
        noseY = poses[0].pose.keypoints[0].position.y;
    }
}

function draw()
{

    if (gameOver == false)
    {
        background(bg2);

        image(txt1, 300, 100);
        image(logo, 10, 370);

        textSize(16);
        fill(48, 64, 43);
        textFont(fonteTexto);
        text("Trabalho realizado por:        Bernardo Azevedo       Gaspar Espinheira", textoX, textoY);
        textoX = textoX - 1.5;

        if (textoX + 250 < 0) 
        {
            textoX = 1500;
        }

        textAlign(CENTER);
        textSize(26);

        image(button1, 530, 270);

        image(button3, 1000, 370);

        // Botao Play
        if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu1 && mouseY < yMenu1 + altura) 
        {
            image(button1, 515, 260, 190, 170);
            if(mouseIsPressed)
            {
                tela = 1;
                soundClick.play();
                soundMusic.play();
            }
        }

        // Botao Recordes
        if (mouseX > xMenu1 && mouseX < xMenu1 + largura1 && mouseY > yMenu2 && mouseY < yMenu2 + altura1) 
        {
            image(button3, 999, 360, 110, 100);
            if(mouseIsPressed)
            {
                soundClick.play();
                tela = 2;
            }
        }

        desenhaMira();
        noCursor();
    
        // Ciclo quando a seleção do menu foi o para jogar
        if (tela == 1)
        {
            image(bg5, 620, 0, 620, 480);

            aCaptura.loadPixels();
            image(basket, noseX + 620, noseY);

            desenhaBola();
            movimentoBolas();

            translate (aCaptura.width, 0);
            scale(-1, 1);

            
            image(aCaptura, 0, 0);


            desenhaTexto();
            desenhaVidas();
        }

        // Tela das pontuaçoes e recorde
        if (tela == 2)
        {
            background(bg4);

            image(record, 420, 60);
            image(recordletter, 370, 30);
            image(button4, 20, 20);

            fill(0, 0, 255);
            textFont(fonteTexto1);
            
            max = Math.max(...pontuacao);
            if(max == -Infinity)
            {
                max=0;
            }

            textSize(60);
            stroke(color(0, 0, 0));
            strokeWeight(4);
            text(max , 600, 250);
            textSize(50);
            text(lastPoints, 600, 400);

            // Botao Back
            if (mouseX > xMenu2 && mouseX < xMenu2 + largura2 && mouseY > yMenu3 && mouseY < yMenu3 + altura2) 
            {
                image(button4, 20, 20, 55, 55);
                if(mouseIsPressed)
                {
                    soundClick.play();
                    tela = 0;
                }
            }

            desenhaMira();
            noCursor();
        }  
    }
    else
    {   
        background(bg3);
        soundMusic.stop();
        soundBuzzer.play();
        if (mouseIsPressed)
        {   
            initJogo();
            soundBuzzer.stop();
        }
        desenhaMira();
        noCursor();
    }
}

// Função que desenha a bola com ajuda da classe bola
function desenhaBola()
{
    if(millis() - tempo > intervalo) 
    {
        let pos = [730, 840, 930, 1100];
        let posX = random(pos);
        let posY = 10;
        let vel = [1 ,2 ,3];
        let vely = random(vel);

        bolaInimigos = new InimigoBola(posX,  posY, vely);
        osInimigosBola.push(bolaInimigos);


        tempo = millis();
        console.log(osInimigosBola);
    }

}

// Função que movimenta as bolas no canvas e onde estão estabelecidas as colisões
function movimentoBolas()
{
    if (osInimigosBola.length > 0)
    {
        for (var k = 0; k < osInimigosBola.length; k++) 
        {

            bolaInimigos = osInimigosBola[k];
            bolaInimigos.moveInimigoBola();
        }

        if (osInimigosBola.length > 0)
      {
          for (var k = 0; k < osInimigosBola.length; k++)
          {
              bolaInimigos = osInimigosBola[k];
              
              if (circuloCirculo(noseX + 665, noseY + 50, circDiam, bolaInimigos.x, bolaInimigos.y, bolaInimigos.diam ))
              {
                  removeBola(bolaInimigos);

                  // --display de um som de colisao
                  soundBasket.play();
                  
                  pontos++;

                  // --interromper o ciclo for
                  break;
              }
              if (bolaInimigos.y >= 480)
              {
                removeBola(bolaInimigos);

                vidas--;
                soundLife.play();
                if (vidas == 0)
                {
                    esvaziaBolas();
                    lastPoints=pontos;
                    pontuacao.push(pontos);
                    gameOver = true;
                }

                break;
              }
          }
      }
      else
      {
        gameOver = true;
      }
    }
}

// --removeBola
function removeBola(obj) 
{
    var index = osInimigosBola.indexOf(obj);
    if (index > -1)
    {
        osInimigosBola.splice(index, 1)
    }
}

// --esvaziaBolas
function esvaziaBolas()
{
    for (var k = 0;k < osInimigosBola.length;k++) 
    {
  
      bolaInimigos = osInimigosBola[k];
  
      removeBola(bolaInimigos);
    }
}

// --desenhaTexto
function desenhaTexto() 
{
  translate (aCaptura.width, 0);
  scale(-1, 1);
  fill(0);
  textSize(35);
  textStyle(BOLD);
  textFont(fonteTexto)
  image(board1, 20, 20);
  text("" + pontos, 110, 65);
  noCursor();
}

function desenhaVidas()
{
    image(board2, 390, 23);

    if(vidas == 3)
    {
        image(life1, 460, 40);
        image(life1, 503, 40);
        image(life1, 545, 40);
    }
    else if(vidas == 2)
    {
        image(life1, 460, 40);
        image(life1, 503, 40);
    }
    else if(vidas == 1)
    {
        image(life1, 460, 40);
    }

}

// -- desenhaMira
function desenhaMira() 
{
    imageMode(CENTER);
    image(mira, mouseX, mouseY);
    imageMode(CORNER);
}
