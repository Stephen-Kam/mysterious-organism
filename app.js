//Codecademy Helper functions
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


//Start of own work

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15)
      const randomDNA = this.dna[randomIndex];
      let targetDNA = randomDNA;
      const dnaBases = ['A', 'T', 'C', 'G'];
      while (randomDNA === targetDNA) {
        targetDNA = dnaBases[Math.floor(Math.random() * 4)]
      }
      return dna.splice(randomIndex, 1, targetDNA);
    },
    compareDNA(obj) {
      const dna1 = this.dna;
      const dna2 = obj.dna;
      let common = 0;
      for (let i = 0; i < dna1.length; i++) {
        if (dna1[i] === dna2[i]) {
          common++;
        }
      }
      console.log(`Specimens #${this.specimenNum} and #${obj.specimenNum} have ${((common / 15) * 100).toFixed(2)}% DNA in common.`)
      return (common / 15) * 100;
    },
    willLikelySurvive() {
      let survival = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') survival++;
      }
      if ((survival / 15) * 100 >= 60) {
        return true;
      } else return false;
    },
    complementStrand() {
      return this.dna.map(strand => {
        if (strand === 'A') return 'T';
        if (strand === 'T') return 'A';
        if (strand === 'C') return 'G';
        if (strand === 'G') return 'C';
      });
    }
  }
};

const pAequor = [];

for (let i = 0; i < 30; i++) {
  pAequor.push(pAequorFactory(i, mockUpStrand()));
}

// Extra Credit
const specimenOne = pAequorFactory(1001, mockUpStrand());
console.log(specimenOne.dna);
console.log(specimenOne.complementStrand());

const findMostRelated = (arr) => {
  let mostRelated = [];
  let highestValue = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstSpecimen = arr.slice(i, arr.length)[0]
      const secondSpecimen = arr[j];
      const result = firstSpecimen.compareDNA(secondSpecimen);
      if (result > highestValue) {
        highestValue = result;
        mostRelated = [firstSpecimen, secondSpecimen];
      }
    }
  }
  return `Specimens #${mostRelated[0].specimenNum} and #${mostRelated[1].specimenNum} have the most DNA in common with ${highestValue.toFixed(2)}%`
}

console.log(findMostRelated(pAequor));


// Validation
// const specimenOne = pAequorFactory(1001, mockUpStrand());
// const specimenTwo = pAequorFactory(2001, mockUpStrand());

// console.log(specimenOne);
// console.log(specimenTwo);

// specimenOne.mutate();
// console.log(specimenOne);

// specimenOne.compareDNA(specimenTwo);
// console.log(specimenOne.willLikelySurvive());

// console.log(pAequor);
