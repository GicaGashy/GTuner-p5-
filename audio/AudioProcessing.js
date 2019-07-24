class AudioProcessing {
    constructor() {
        this.mic = new p5.AudioIn();
        this.fft = new p5.FFT(0.85, 16384); //(smoothing, numberOfBins)
        this.Tune = new Tune(1);
    }

    startListening() {
        this.mic.start();
        this.fft.setInput(this.mic);
    }

    stopListening(){
        this.mic.stop();
    }

    getResolution() {
        return (sampleRate() / 2) / 16384;
    }

    getLoudestFrequency() { //https://stackoverflow.com/questions/50376861/how-to-get-frequency-value-in-javascript
        var nyquist = sampleRate() / 2; // --> https://en.wikipedia.org/wiki/Nyquist_frequency
        var spectrum = this.fft.analyze(); // 
        var numberOfBins = spectrum.length; // 16384 ne kete rast p5.fft(16384)
        var maxAmp = 0;
        var largestBin;
        for (let i = 0; i < numberOfBins; i++) {
            let thisAmp = spectrum[i]; // amplitude of current bin --> 
            if (thisAmp > maxAmp) {
                maxAmp = thisAmp;
                largestBin = i;
            }
        }
        //console.log(largestBin);
        let loudestFreq = largestBin * (nyquist / numberOfBins);
        return loudestFreq;
    }


    //Funksioni qe kthen indeksin e Bin-it duke marur si input vleren e frekuences
    //Bi = (Bt * f) / Ny
    //Bi = Bin Index; Bt = Bins total; f = frequency; Ny = Nyquist
    getBinIndex(freq) {
        if (freq < 0) return 0;
        let Bi = 0;
        let Ny = sampleRate() / 2;
        let spectrum = this.fft.analyze();
        let Bt = spectrum.length;
        Bi = (Bt * freq) / Ny;
        return parseInt(Bi.toFixed(0));
    }

    //Funksioni per ti marur Indexet e Binave me target dhe range
    getRangedBinIndexes(freq, range) {
        let Bi = this.getBinIndex(freq);
        let BiRange = [];
        if (range < 0 || Bi < range) { // na sigurin qe s'marim index negativ
            return Bi;
        }
        for (let i = 0; i <= range * 2; i++) {
            let value = (Bi - range) + i; // Dmth nese Bin Index = 20, vlerat na jap +- range, psh: [18, 19, 20, 21, 22]
            if (value < 0) {
                value = Bi;
            }
            BiRange.push(value);
        }
        return BiRange;
    }

    /*
    Hajde pi definojna cilat bina kena mi lyp kur te bojna tuning.
    Dmth per secilin string E, A, D, G, B, e, cilat bina korrespondojne
    me qet rezolucion. Rezolucioni eshte i definum ne Hz. Nese e shikojna
    getResolution() : 1.46484375 Hz, dmth per cdo bin deri te bin + 1 i kena
    1.46484375 Hz. Ma sakt nuk mundemi me mat sepse numrin e binave e kena te
    limitum me 16384 nga Libraria. Keshtu qe tuning sko me kon 100 % i sakt.
    82.41, 110.00, 146.83, 196.00, 246.94, 329.63
    */
    //Metod ndihmese sa mos me perdor excelin :D
    binRangeForAllKeys() {
        let tuneBins = [];
        for (let i = 0; i < this.Tune.freqs.length; i++) {
            let freqBinIndex = this.getBinIndex(this.Tune.freqs[i]);
            tuneBins.push(freqBinIndex);
        }
        return tuneBins;
    }

    /*
    Qitu po i zgjerojm bandat e binave. Dmth me ja lon lluft me lyp pak ma ne
    te majt ose ne te djatht, edhe e kthejna krejt kete si ni objekt me rengja gati
    input-i eshte cili string?
    */
    stringToTune(inputString, range) {
        let E = {
            string: this.Tune.strings[0],
            freq: this.Tune.freqs[0],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[0], range)
        };
        let A = {
            string: this.Tune.strings[1],
            freq: this.Tune.freqs[1],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[1], range)
        };
        let D = {
            string: this.Tune.strings[2],
            freq: this.Tune.freqs[2],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[2], range)
        };
        let G = {
            string: this.Tune.strings[3],
            freq: this.Tune.freqs[3],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[3], range)
        };
        let B = {
            string: this.Tune.strings[4],
            freq: this.Tune.freqs[4],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[4], range)
        };
        let e = {
            string: this.Tune.strings[5],
            freq: this.Tune.freqs[5],
            binsToLookFor: this.getRangedBinIndexes(this.Tune.freqs[5], range)
        };

        switch (inputString) {
            case 'E': return E;
            case 'A': return A;
            case 'D': return D;
            case 'G': return G;
            case 'B': return B;
            case 'e': return e;
            default: return null;
        }
    }

    /*
    Eh tek qitas po ja nisim me mat dicka.
    Po e determinojna cilin key po dojna me mat, edhe po e matim me 
    LoudestFreq
    */
    getLoudestFrequencyTargeted(targetString, rangeLimit) {
        let str = this.stringToTune(targetString, rangeLimit);
        if (str != null) {
            let bins = str.binsToLookFor;
            let nyquist = sampleRate() / 2;
            let spectrum = this.fft.analyze(); // 
            let maxAmp = 0;
            let largestBin;
            //console.log(bins, bins[0], bins[bins.length - 1]);
            for (let i = bins[0]; i <= bins[bins.length - 1]; i++) {
                let thisAmp = spectrum[i]; // amplitude of current bin --> 
                if (thisAmp > maxAmp) {
                    maxAmp = thisAmp;
                    largestBin = i;
                }
            }
            //console.log(largestBin);
            let loudestFreq = largestBin * (nyquist / spectrum.length);
            //console.log(loudestFreq);
            return loudestFreq;
        }
        return undefined;
    }


    /*
    Tash mos me pas nevoj me qit secilen her nga nje, po e leshojm Tuner-in.
    */
    allMightyTuner(isOn, rangeLimit){
       let output = {
            E: null,
            A: null,
            D: null,
            G: null,
            B: null,
            e: null
        };
        if(isOn){
            output.E = this.getLoudestFrequencyTargeted('E', rangeLimit);
            output.A = this.getLoudestFrequencyTargeted('A', rangeLimit);
            output.D = this.getLoudestFrequencyTargeted('D', rangeLimit);
            output.G = this.getLoudestFrequencyTargeted('G', rangeLimit);
            output.B = this.getLoudestFrequencyTargeted('B', rangeLimit);
            output.e = this.getLoudestFrequencyTargeted('e', rangeLimit);
        }else{
            this.stopListening();
            output.E = null;
            output.A = null;
            output.D = null;
            output.G = null;
            output.B = null;
            output.e = null;
        }
        return output;
    }

    /*
    Methoda per krahasimin e freqkuencave (Ndoshta e perdori ma vone)
    kjo nuk i merr parasysh binat, thjesht vetem frekuencat, mirepo too much noise
    jo e sakt.
    */
    matchFreq(input, range) {
        let E = this.multiplesRange(this.Tune.freqs[0], range);
        let A = this.multiplesRange(this.Tune.freqs[1], range);
        let D = this.multiplesRange(this.Tune.freqs[2], range);
        let G = this.multiplesRange(this.Tune.freqs[3], range);
        let B = this.multiplesRange(this.Tune.freqs[4], range);
        let e = this.multiplesRange(this.Tune.freqs[5], range);
        let outputString = 'unknown';
        for (let iE of E) {
            if (iE >= input - this.smoothFactor && iE <= input + this.smoothFactor) {
                outputString = this.Tune.strings[0];
            }
        }

        for (let iA of A) {
            if (iA >= input - this.smoothFactor && iA <= input + this.smoothFactor) {
                outputString = this.Tune.strings[1];
            }
        }

        for (let iD of D) {
            if (iD >= input - this.smoothFactor && iD <= input + this.smoothFactor) {
                outputString = this.Tune.strings[2];
            }
        }

        for (let iG of G) {
            if (iG >= input - this.smoothFactor && iG <= input + this.smoothFactor) {
                outputString = this.Tune.strings[3];
            }
        }

        for (let iB of B) {
            if (iB >= input - this.smoothFactor && iB <= input + this.smoothFactor) {
                outputString = this.Tune.strings[4];
            }
        }

        for (let ie of e) {
            if (ie >= input - this.smoothFactor && ie <= input + this.smoothFactor) {
                outputString = this.Tune.strings[5];
            }
        }
        return outputString;
    }

    //metoda per mapimin e notave nga frekuenca
    translateToNote(value) {
        if (this.matchFreq(value)) {
            console.log(indexOf(this.freqs));
            return indexOf(this.freqs);
        }
    }

    //Merri produktet me ni range te nje inputi (freqkuenca)   return Bi.toFixed(0);
    //Psh nese inputi eshte 50: 50, 100, 150, 200 ...
    multiplesRange(input, limit) {
        let output = [];
        for (let i = 1; i < limit + 1; i++) {
            let product = parseFloat((input * i).toFixed(2));
            output.push(product);
        }
        return output;
    }


}