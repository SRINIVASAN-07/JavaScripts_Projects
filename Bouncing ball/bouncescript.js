const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

let x = Math.random() * canvas.width;
let y = Math.random() * canvas.height;
let vx = (Math.random() - 0.5) * 10;
let vy = (Math.random() - 0.5) * 10;
const radius = 20;

function animate() {
    
requestAnimationFrame(animate);
context.clearRect(0, 0, canvas.width, canvas.height);

context.beginPath();
context.arc(x, y, radius, 0, Math.PI * 2, false);
context.fillStyle = 'blue';
context.strokeStyle = 'black';
context.fill();
context.stroke();

if (x + radius > canvas.width || x - radius < 0) 
{
vx = -vx;
}

if (y + radius > canvas.height || y - radius < 0) 
{
vy = -vy;
}

x += vx;
y += vy;
}

animate();
