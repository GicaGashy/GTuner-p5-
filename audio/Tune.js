      class Tune {
         constructor(smoothFactor) {
            this.name = "Standard";
            this.strings = ['E', 'A', 'D', 'G', 'B', 'e'];
            this.freqs = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
            this.smoothFactor = smoothFactor;
         }

         

         //Pasi qe nje Tune gjithmon vjen me default frekuence te stringjeve
         //ideja eshte nese deshirojna me bo Tuneing ne tjeter menyre...
         //Shkojna prej stringut ma nalt deri te ai posht dmth E,A,D,G,B,e
         setTuningFrequencies(E, A, D, G, B, e) {
            this.freqs[0] = E;
            this.freqs[1] = A;
            this.freqs[2] = D;
            this.freqs[3] = G;
            this.freqs[4] = B;
            this.freqs[5] = e;
         }

         //gjithashtu i ndryshojna edhe emrat e notave
         setTuningNoteNames(E, A, D, G, B, e) {
            this.strings[0] = E;
            this.strings[1] = A;
            this.strings[2] = D;
            this.strings[3] = G;
            this.strings[4] = B;
            this.strings[5] = e;
         }

      }
