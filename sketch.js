    let mic, fft;
    let limit = 0;
    let micLevel;
    let txt;
    let neckImage;
    let repeatRadio;
    function setup() {
        createCanvas(innerWidth-20, 600);
        setAttributes('antialias', true);
        textFont('Helvetica');
        AP = new AudioProcessing();
        AP.startListening();
        mic = AP.mic;
        fft = AP.fft;
        textSize(20);
        angleMode(DEGREES);
        Tune = new Tune(1);
        Manager = new Manager();
        Manager.knobs.forEach(knob => {
            knob.tone = loadSound('repository/repo-audio/' + knob.name + '.ogg');
        });

        let onBtn = createButton('ON');
        let offBtn = createButton('OFF');
        let repeateLabel = createP('Repeat:');
        onBtn.position(960, 220);
        offBtn.position(1000, 220);
        repeateLabel.position(900, 220);
        onBtn.mousePressed(repeatOn);
        offBtn.mousePressed(repeatOff);
        
    }

    function preload(){
        neckImage = loadImage('repository/repo-graphics/_neck_f.png');
    }

    function mouseClicked(){
        Manager.knobsActivation();
    }


    function draw() {

        var lFreqe = AP.getLoudestFrequencyTargeted('e', 10);
        var lFreqA = AP.getLoudestFrequencyTargeted('A', 10);
        //var tuner = AP.allMightyTuner(true, 10);
        
        background(255);    
        image(neckImage, 0, 0, 900, 597);
        Manager.knobsDisplay();

        /*
        beginShape();
        for (i = 0; i < spectrum.length; i++) {
            var t = map(spectrum[i], 0, 255, height, 0);
            vertex(i, t);
        }
        endShape();
        */

        //var freq = AP.getLoudestFrequency();
        //let volume = fft.getEnergy(freq);
        //var bins = AP.getRangedBinIndexes(82.41, 1);
        //txt = "Highest Amplitutde Frequency" + "\ne: " +lFreqe.toFixed(2) + "\nA:" +lFreqA.toFixed(2);
        //text(txt, 150, 50);
        text("X: " + mouseX + "\nY: " + mouseY, 30, 30);
        stroke(255);
        line(0, mouseY, innerWidth, mouseY);
        line(mouseX, 0, mouseX, innerHeight);

        push();
        fill(0);
        noStroke();
        let e = lFreqe.toFixed(2);
        let A = lFreqA.toFixed(2);
        text(e, 920, 150);
        text(A, 920, 170);
        pop();
        //console.log(lFreq);

        /*
        let spec = fft.analyze();
        let E = getBinIndex(82.41);
        if(spec[E]  > 140){
            console.log("E", spec[E]);
        }
        let A = getBinIndex(110.00);
        if(spec[A]  > 180){
            console.log("A", spec[A]);
        }
        */
    

        //console.log(getBinIndex(Tune.strings['E']));
    //console.log(Tune.matchFreq(getLoudestFrequency(),2));
    }

    function repeatOn(){
        for(let i = 0; i < Manager.knobs.length; i++){
            Manager.knobs[i].repeat = true;
            console.log(Manager.knobs[i].repeat);
        }
        console.log('on');
    }

    function repeatOff(){
        for(let i = 0; i < Manager.knobs.length; i++){
            Manager.knobs[i].repeat = false;
            console.log(Manager.knobs[i].repeat);
        }
        console.log('off');
    }

