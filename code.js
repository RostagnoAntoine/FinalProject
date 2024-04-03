function Piece(row, col, color)
{
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = false;
    this.isKing = false;
}

Piece.prototype.draw = function(ctx, squareSize)
{
    if (this.isClicked)
    {
        ctx.beginPath();
        ctx.arc((this.col + 0.5) * squareSize, (this.row + 0.5) * squareSize, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.arc((this.col + 0.5) * squareSize, (this.row + 0.5) * squareSize, 35, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

let board = [
    ["", new Piece(0, 1, "red"), "", new Piece(0, 3, "red"), "", new Piece(0, 5, "red"), "", new Piece(0, 7, "red")],
    [new Piece(1, 0, "red"), "", new Piece(1, 2, "red"), "", new Piece(1, 4, "red"), "", new Piece(1, 6, "red"), ""],
    ["", new Piece(2, 1, "red"), "", new Piece(2, 3, "red"), "", new Piece(2, 5, "red"), "", new Piece(2, 7, "red")],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [new Piece(5, 0, "gray"), "", new Piece(5, 2, "gray"), "", new Piece(5, 4, "gray"), "", new Piece(5, 6, "gray"), ""],
    ["", new Piece(6, 1, "gray"), "", new Piece(6, 3, "gray"), "", new Piece(6, 5, "gray"), "", new Piece(6, 7, "gray")],
    [new Piece(7, 0, "gray"), "", new Piece(7, 2, "gray"), "", new Piece(7, 4, "gray"), "", new Piece(7, 6, "gray"), ""]
];

function getSelectedPiece()
{
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].length; j++)
        {
            if (board[i][j] instanceof Piece && board[i][j].isClicked)
            {
                return board[i][j];
            }
        }
    }
    return null;
}

Piece.prototype.draw = function(ctx, squareSize)
{
    if (this.isClicked)
    {
        ctx.beginPath();
        ctx.arc((this.col + 0.5) * squareSize, (this.row + 0.5) * squareSize, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.arc((this.col + 0.5) * squareSize, (this.row + 0.5) * squareSize, 35, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

document.getElementById("myCanvas").addEventListener("click", function(event)
{
    let canvas = document.getElementById("myCanvas");
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let row = Math.floor(y / (canvas.width / 8));
    let col = Math.floor(x / (canvas.width / 8));

    if (board[row][col] instanceof Piece)
    {
        let selectedPiece = getSelectedPiece();
        if (selectedPiece !== null)
        {
            selectedPiece.isClicked = !selectedPiece.isClicked;
        }
        board[row][col].isClicked = !board[row][col].isClicked;
    }

    drawBoard();
    drawPieces();
});

function drawBoard()
{
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let squareSize = canvas.width / 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < 8; row++)
    {
        for (let col = 0; col < 8; col++)
        {
            if ((row + col) % 2 === 0)
            {
                ctx.fillStyle = "white";
            }
            else
            {
                ctx.fillStyle = "black";
            }
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

function drawPieces()
{
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let squareSize = canvas.width / 8;

    for (let row = 0; row < 8; row++)
    {
        for (let col = 0; col < 8; col++)
        {
            if (board[row][col] instanceof Piece)
            {
                board[row][col].draw(ctx, squareSize);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    drawBoard();
    drawPieces();
});
