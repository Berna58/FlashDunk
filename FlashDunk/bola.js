class InimigoBola 
{
    // construtor

    constructor(px,py,vy) 
    {
        this.x, this.y;

        // Tamanho Bola
        this.tamanhoX, this.tamanhoY;

        this.diam = 50;

        // velocidade Inimigo
        this.velocidadeX, this.velocidadeY;

        this.bola = loadImage("assets/bola.png");

        this.x= px;
        this.y= py;

        this.velocidadeY = vy;

        this.tamanhoX = this.tamanhoY = 50;
    }

        moveInimigoBola()
        {
            noStroke();
            fill(34,76,123);
            this.y += this.velocidadeY;
            image(this.bola, this.x, this.y, this.tamanhoX, this.tamanhoY);
        }


}