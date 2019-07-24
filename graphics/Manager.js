class Manager{
    constructor(){
        //Knob('Emri', positaX, positaY, 'Texti', madhesiaERrethit)
        this.knobs = 
        [
           new Knob('E', 404, 111, 'E', 40),
           new Knob('A', 540, 110, 'A', 40),
           new Knob('D', 676, 102, 'D', 40),
           new Knob('G', 679, 505, 'G', 40),
           new Knob('B', 543, 502, 'B', 40),
           new Knob('ee', 408, 501, 'e', 40)
        ];
        this.rStatus = false;
    }

    //aktivizimi i knobave. dmth nese nje knob eshte aktiv
    //tjert deaktivizohen
    knobsActivation(){
        for(let i = 0; i < this.knobs.length; i++ ){
            this.knobs[i].clicked();
            if(this.knobs[i].active){
                for(let j = 0; j < this.knobs.length; j++){
                    if(this.knobs[i].name != this.knobs[j].name){
                        this.knobs[j].deactivate();
                    }
                }
            }
        }
    }

    //shfaqi te gjith knobat
    knobsDisplay(){
        this.knobs[0].setColor(255, 181, 206);
        this.knobs[0].setStringLine(0, 236, 133, 236, 362, 240);
        this.knobs[1].setColor(228, 181, 255);
        this.knobs[1].setStringLine(0, 266, 133, 266, 511, 233);
        this.knobs[2].setColor(181, 235, 255);
        this.knobs[2].setStringLine(0, 296, 133, 296, 644, 228);
        this.knobs[3].setColor(181, 225, 197);
        this.knobs[3].setStringLine(0, 326, 133, 326, 642, 380);
        this.knobs[4].setColor(255, 251, 181);
        this.knobs[4].setStringLine(0, 353, 133, 353, 506, 377);
        this.knobs[5].setColor(201, 255, 181);
        this.knobs[5].setStringLine(0, 381, 133, 381, 361, 379);

        this.knobs.forEach(knob =>{
            knob.display(0.8);
        });
    }

    //toggle repeate on
    knobsRepeatToggleOn(){
        this.knobs.forEach(knob => {
            knob.repeat = true;
        });
        console.log("ON", this.knobs);
    }

    //toggle repeate off
    knobsRepeatToggleOff(){
        this.knobs.forEach(knob => {
            knob.repeat = false;
        });
        console.log("OFF", this.knobs);
    }

    //Display the toggle radios
    displayRepeatOptions(){
        let onBtn = createButton('ON');
        let offBtn = createButton('OFF');
        let repeateLabel = createP('Repeat:');
        onBtn.position(960, 220);
        offBtn.position(1000, 220);
        repeateLabel.position(900, 220);
    }

    //

}