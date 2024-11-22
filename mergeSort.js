function bubbleSort(array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        for(let j = 0; j < length; j++) {
            if (i < j && array[i] > array[j]) {
                let valueToSave = array[j];
                array[j] = array[i];
                array[i] = valueToSave;
            };
        };
    };
    return array;
};


function removeDuplicate(array) {
    const set = new Set(array);
    return Array.from(set);
};


export function mergeSort(array) {
    //Removing duplicate first:
    array = removeDuplicate(array);

    const length = array.length;
    if (length <= 1) return array
    const halfArray = Math.floor(length/2);
    const leftArray = array.slice(0, halfArray);
    const rightArray = array.slice(halfArray, length);

    const firstArray = mergeSort(leftArray);
    const secondArray = mergeSort(rightArray);
    
    //merge for sorted list
    function merge(arrayLeft, arrayRight) {
        let newArray = [];
        let i = 0;
        let j = 0;
        const leftLength = arrayLeft.length;
        const rightLength = arrayRight.length;
        while (i < leftLength && j < arrayRight.length) {
            if(arrayLeft[i] <= arrayRight[j]) {
                newArray.push(arrayLeft[i]);
                i++;
            } else {
                newArray.push(arrayRight[j]);
                j++;
            }
        };

        if (i != leftLength) {
            return newArray.concat(arrayLeft.slice(i))
        }

        if (j != rightLength) {
            return newArray.concat(arrayRight.slice(j))
        }

        return newArray;
    };
    
    return merge(firstArray, secondArray);
};
