// --Detetar a colisão entre 2 circulos
// --Coordenadas + diametro
function circuloCirculo (x1, y1, d1, x2, y2, d2)
{
    var xDist = x1 - x2; // --distancia na horizontal
    var yDist = y1 - y2; // --distancia na vertical
    var distancia = sqrt((xDist * xDist) + (yDist * yDist));


    // --teste da colisao
    if (d1/2 + d2/2 > distancia)
    {
        return true;
    }
    else
    {
        return false;
    }


}