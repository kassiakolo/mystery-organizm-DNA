// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function to create DNA of the organizm
let pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    //Method that replaces one randomly choosen place with one randomly choosen base
    mutate() {
      let randomIndex = Math.floor(Math.random() * this.dna.length);

      let result = returnRandBase();
      while (this.dna[randomIndex] === result) {
        result = returnRandBase();
      }

      this.dna[randomIndex] = result;
      return this.dna;
    },

    //Method that compares DNAs
    compareDna(pAequor) {
      let specimen1 = this.dna;
      let specimen2 = pAequor.dna;
      let identicalPlaces = 0;
      let totalPlaces = this.dna.length;

      for (let i = 0; i < totalPlaces; i++) {
        if (specimen1[i] === specimen2[i]) {
          identicalPlaces += 1;
        }
      }

      let result = (identicalPlaces / totalPlaces) * 100;
      result = result.toFixed(2);
      console.log(`Specimen #1 and specimen #2 have ${result}% DNA in common.`);
    },

    //Method that checks if the organizm is likely to survive (has to have at least 60% of C or G)
    willLikelySurvive() {
      let totalPlaces = this.dna.length;
      let placesWithGoodBases = 0; //Number of places with C or G

      for (let i = 0; i < totalPlaces; i++) {
        if (["C", "G"].indexOf(this.dna[i]) >= 0) {
          placesWithGoodBases += 1;
        }
      }

      let result = (placesWithGoodBases / totalPlaces) * 100;
      if (result >= 60) {
        return true;
      } else {
        return false;
      }
    },

    //Method that creates complement strand of DNA following exact rules
    complementStrand() {
      let complementDna = [];
      complementDna = this.dna.map((element) => {
        switch (element) {
          case "A":
            return "T";
          case "T":
            return "A";
          case "C":
            return "G";
          case "G":
            return "C";
        }
      });
      return complementDna;
    },
  };
};

//Function that generetes choosen number of different organizms
let generatePAequor = (num) => {
  let listOfPAequors = [];

  for (let i = 1; i <= num; i++) {
    let newPAequor = pAequorFactory(i, mockUpStrand());
    if (!newPAequor.willLikelySurvive()) {
      i--;
      continue;
    }
    listOfPAequors.push(newPAequor);
  }
  return listOfPAequors;
};

//Manual tests
let pAequor1 = pAequorFactory(1, mockUpStrand());
console.log(pAequor1);

let pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor2);

let pAequor3 = pAequorFactory(3, mockUpStrand());
let pAequor4 = pAequorFactory(4, mockUpStrand());

//Mutate method test
pAequor1.mutate();
console.log(pAequor2.mutate());

//Compare DNa method test
pAequor1.compareDna(pAequor2);

//willLikely suvive method test
console.log(pAequor2.willLikelysurvive());
console.log(pAequor1.willLikelysurvive());
console.log(pAequor3.willLikelysurvive());
console.log(pAequor4.willLikelysurvive());

//Testing function that generates organizms
console.log(generatePAequor(5));

//Complement strand method test
console.log(pAequor1.complementStrand());
