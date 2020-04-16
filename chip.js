class BatValuse{
    constructor(type,chip){
        this.type = type;
        this.chip = chip;
    }
}
function getChipValueOn(type,array){
    var total = 0;

    switch (type[0]) {
        case "zero":
            break;
        case "voisins":
            break;
        case "orph":
            break;
        case "tier":
            break;
        default:
            array.forEach(element => {
                console.log(type,element.type);
                if(arraysMatch(type,element.type)){
                    
                    total += element.chip;
                }
            });
            break;
    }

   
    return total;
}
var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};