class Knob {
    constructor(name, posX, posY, txt, r) {
        this.name = name;
        this.txt = txt;
        this.r = r;
        this.posX = posX;
        this.posY = posY;
        this.active = false;
        this.originalX = posX;
        this.originalY = posY;
        this.originalR = r;
        this.tone = null;
        this.repeat = false;
        this.amp = new p5.Amplitude(); //-> me qito e marim amplituden e zerit.
        this.color = {
            r: 255,
            g: 255,
            b: 255
        };
        this.heartBeatVoLHistory = [];
        this.stringLine = {
            x1: 0,
            y1: 0,
            x2: 10,
            y2: 10,
            x3: 20,
            y3: 20
        };
        
    }

    setText(txt) {
        this.txt = txt;
    }

    setColor(r, g, b){
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
    
    //mi pikat prej telit deri te knobi
    setStringLine(x1, y1, x2, y2, x3, y3){
        this.stringLine.x1 = x1;
        this.stringLine.y1 = y1;
        this.stringLine.x2 = x2;
        this.stringLine.y2 = y2;
        this.stringLine.x3 = x3;
        this.stringLine.y3 = y3;
    }

    //aktivizo nese s'eshte tu play isPlaying() kthen true / false
    //perndryshe sa here te klikon ne knob e lun zerin edhe bohet lomsh
    activate() {
        if(!this.tone.isPlaying()){
            this.active = true;
            if(this.repeat){
                this.tone.loop();
                return;
            }else if(!this.repeat){
                this.tone.stop();
                this.tone.play();
                return;
            }
        }
    }

    //kur e deaktivizojna e nalim zerin edhe e bojn inactive
    deactivate() {
        this.active = false;
        this.posX = this.originalX;
        this.posY = this.originalY;
        this.posR = this.originalR;
        this.tone.stop();
    }

    //kjo e shfaq nje Knob, nese s'eshte aktive
    //dmth e qet ne default kur s'eshte aktive
    display() {
        noStroke();
        fill(0);
        if(!this.active){
            fill(230);
            ellipse(this.originalX, this.originalY, this.originalR);
            textSize(20);
            textAlign(CENTER, CENTER);
            fill(0);
            text(this.txt, this.posX, this.posY);
            this.r = this.originalR;
        }else{
            this.animate();
        }
    }

    //Me kontrollu a eshte tu u prek knob-i?
    //funksioni dist(sourceX, soruceY, targetX, targetY) e kthen distancen ne piksela
    //Tash clicked eshte true nese distanca eshte ma e vogel ose e barabart se Radiusi i rrethit (knobit)
    clicked() {
        let d = dist(mouseX, mouseY, this.posX, this.posY);
        if (d <= this.r) {
            this.activate();
            return true;
        }
        this.deactivate();
        return false;
    }
    
    //Mi animu levizjet e knobit
    //E mer si imput volum-in nga amp.getLevel() edhe e map-ojm me me radius
    animate(){
        let volume = this.amp.getLevel();
        let diam = map(volume, 0, 1, this.r, this.r * 4);
        let clr = this.color;
        fill(clr.r, clr.g, clr.b);
        ellipse(this.posX, this.posY, diam);
        textSize(22);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.txt, this.posX, this.posY);
        this.bigIndicator();
    }

    animateRadialGraph(){
        push();
        let volume = this.amp.getLevel();
        this.radialVolHistory.push(volume);
        stroke(this.color.r, this.color.g, this.color.b);
        noFill();
        
        beginShape();
        for(let i = 0; i < 360; i++){
            let r = map(this.radialVolHistory[i], 0, 1, 100, 1000)
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x,y);
        }
        endShape();
        pop();
        if(this.radialVolHistory.length > 360){
            this.radialVolHistory.splice(0,1);
        }
    }

    //dmth qitu pi vizatojna vijat e gitares deri te knobi
    //edhe rrumbullakat ne te djath plus heart beating perfundi
    bigIndicator(){
        let volume = this.amp.getLevel();
        let R = 220;
        let diam1 = map(volume, 0, 1, R, R*2);
        let diam2 = map(volume, 0, 1, R, R/3);
        push();
        textSize(40);
        smooth();
        noFill();
        stroke(this.color.r * 0.8, this.color.g * 0.8, this.color.b * 0.8);
        strokeWeight(4);
        ellipse(1250, 200, diam1, diam1);
        strokeWeight(1);    
        ellipse(1250, 200, diam2, diam2);
        noStroke();
        textSize(60);
        textAlign(CENTER, CENTER);
        fill(0);
        fill(this.color.r * 0.8, this.color.g * 0.8, this.color.b * 0.8);
        text(this.txt, 1250, 200);
        let strk = map(volume, 0,1,4,16);
        strokeWeight(strk);
        let alpha = map(volume, 0, 1, 180, 255);
        stroke(this.color.r, this.color.g, this.color.b, alpha);
        noFill();
        beginShape();
        vertex(this.stringLine.x1, this.stringLine.y1);
        vertex(this.stringLine.x2, this.stringLine.y2);
        vertex(this.stringLine.x3, this.stringLine.y3);
        endShape();
        pop();

        //hearbeat credit: daniel shiffman (https://www.youtube.com/watch?v=jEwAMgcCgOA);
        this.heartBeatVoLHistory.push(volume);
        push();
        stroke(this.color.r*0.8, this.color.g*0.8, this.color.b*0.8);
        strokeWeight(2);
        noFill();
        beginShape();
        for(let i = 0; i < this.heartBeatVoLHistory.length; i++){
            let y = map(this.heartBeatVoLHistory[i], 1, 0, 50, 250);
            vertex(i+1150, y+200);
        }
        endShape();

        if(this.heartBeatVoLHistory.length > 200){
            this.heartBeatVoLHistory.splice(0, 1);
        }
        pop();
    }




}