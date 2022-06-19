let Canvas = document.getElementById("canvas");
const ctx = Canvas.getContext("2d");
const dt = 0.01;
Canvas.width = 9*window.innerWidth/10;

bruh=[5,6,7,8,9,10,11,12,13,14,15,16];

let p = [];
Mouse = { x:0, y:0 }
function note(e){
    Mouse.x = e.offsetX;
    Mouse.y = e.offsetY;
}
clear = () => { ctx.clearRect(0, 0, Canvas.clientWidth, Canvas.height); }
random = (high, low = 0) => Math.floor(high*Math.random()+low)-low;
rls = (a=[0,1,2,3,4,5,6,7,8,9,10]) => {
    let u = random(a.length);
    return a[u];
}
rnds = (arr)=>{
    let u = random(arr.length);
    return arr[u]
}
arw = (X0, Y0, dX, dY, col = "black") => {
    ctx.beginPath();
    let r = Math.sqrt(dX*dX + dY*dY), R = 30;
    dX*= R/r; dY*= R/r;
    ctx.strokeStyle = col; ctx.moveTo(X0, Y0); ctx.lineTo(X0+dX, Y0+dY); ctx.stroke();
}
circle = (x, y, r=10, str = null, fill = null) => {
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI);
    if(typeof fill == "string"){ ctx.fillStyle = fill; ctx.fill() }
    if(typeof str == "string"){ ctx.strokeStyle = str; ctx.stroke() }
}
d = (a, b, arr) => { 
    if((Math.pow(arr[b].x[0]-arr[a].x[0], 2)+Math.pow(arr[b].x[1]-arr[a].x[1], 2))==0) return 0.001
    else return Math.sqrt(Math.pow(arr[b].x[0]-arr[a].x[0], 2)+Math.pow(arr[b].x[1]-arr[a].x[1], 2)).toFixed(2) 
}
Force = (x , i , arr) => {
    let R0 = arr[i].R0, R = arr[i].R;
    if(x<R0) return 32*arr[i].m*(x*x-R0*R0);
    else if(x<R) return -arr[i].m*(x-R0)*(x-R);
    else return 0;
}

function Particle(x = [0, 0], mass=1){
    this.x = x; this.m = mass;

    this.R0 = Math.abs(2*this.m);
    this.R = Math.abs(4*this.m);

    this.v = [0, 0];
    this.F = [0, 0];

    this.draw = () => {
        let cl = "white";
        if(this.m==1) cl="#86cefa";
        else if(this.m==2) cl="yellow";
        else if(this.m==3) cl="gray";
        else if(this.m==4) cl="brown";
        else if(this.m==5) cl="gray";
        else if(this.m==6) cl="black";
        else if(this.m==7) cl="green";
        else if(this.m==8) cl="#ccffff";
        else if(this.m==9) cl="red";
        else if(this.m==10) cl="#00ffcc";
        else if(this.m==11) cl="#68685a";
        else if(this.m==12) cl="#d0d0c8";
        else if(this.m==13) cl="#adad9f";
        else if(this.m==14) cl="#7ea1c4";
        else if(this.m==15) cl="#ace600";
        else if(this.m==16) cl="yellow";
        else cl="white";
        
        circle(this.x[0], this.x[1], 0.5*this.R0, null, cl);
        //circle(this.x[0], this.x[1], this.R, "red");
    }
}

function addp(){ 
    p.push(new Particle([Mouse.x, Mouse.y], rls(bruh))); 
    clear(); 
    p.forEach(item => item.draw()) 
}

many=()=>{
    for (let k = 0; k < 100; k++) {
        p.push(new Particle([random(Canvas.width/2)+Canvas.width/4, random(Canvas.height/2)+Canvas.height/4], rls(bruh))); clear(); p.forEach(item => item.draw())
    }
}