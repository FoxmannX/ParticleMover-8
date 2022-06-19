var flow = null;

creation = () => {
    clear();
    for(let i = 0; i < p.length; i++) {
        p[i].F=[0, 0];
        for(let j = 0; j < p.length; j++){
            if(j==i || d(i, j, p)>=p[i].R) continue;
            p[i].F[0] += p[j].m*Force(d(i, j, p), i, p)*(p[j].x[0]-p[i].x[0])/d(i, j, p);
            p[i].F[1] += p[j].m*Force(d(i, j, p), i, p)*(p[j].x[1]-p[i].x[1])/d(i, j, p);
        }
    }
    p.forEach(item => {
        item.v[0] += Number((dt*item.F[0]));
        item.v[1] += Number((dt*item.F[1]));

        let miu = item.m;

        /*(item.v[0]>0)?item.v[0]-=miu:item.v[0]+=miu;
        (item.v[1]>0)?item.v[1]-=miu:item.v[1]+=miu;*/

        item.v[0]/=miu;
        item.v[1]/=miu;

        /*if(item.v[0]>0) item.v[0]-=miu;
        else if(item.v[0]<0) item.v[0]+=miu;
        else item.v[0]-=0;
        if(item.v[1]>0) item.v[1]-=miu;
        else if(item.v[1]<0) item.v[1]+=miu;
        else item.v[1]-=0;*/

        item.x[0] += Number(item.v[0]*dt);
        item.x[1] += Number(item.v[1]*dt);

        /*item.x[0] += 1;
        item.x[1] += 1;*/

        if(item.x[0] < item.R0) item.v[0] *= -1;
        if(item.x[1] < item.R0) item.v[1] *= -1;
        if(item.x[0] > Canvas.width-item.R0) item.v[0] *= -1;
        if(item.x[1] > Canvas.height-item.R0) item.v[1] *= -1;
        
        item.draw();
    });


    /*for(let i = 0; i < p.length; i++) {
        
        for(let j = 0; j < p.length; j++){
            if(j==i || d(i, j, p)<=p[i].R) continue;
            console.log(d(i, j, p));

        }
    }*/

    
}

start_time = () => { flow = setInterval(creation, 100);
//p.forEach(x => console.log(x.R0))
}

stop_time = () => { clearInterval(flow) }