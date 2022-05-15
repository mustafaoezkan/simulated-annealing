export const calculateObjectValueForGeneral = (solutionString: number[], dimension: number) => {
      let objectValue: number = 0;
    let sum: number = 0;
    solutionString.length = dimension;

    for (let i = 0; i < solutionString.length; i++) {
      sum += solutionString[i] * solutionString[i];
    }
    objectValue = sum;
    return objectValue;
};

export const calculateObjectValueForNeighbor = (solutionString: number[], dimension: number) => {
      let objectValue: number = 0;
    let sum: number = 0;
    solutionString.length = dimension;

    for (let i = 0; i < solutionString.length; i++) {
      sum += solutionString[i] * solutionString[i];
    }
    objectValue = sum;
    return objectValue;
};

