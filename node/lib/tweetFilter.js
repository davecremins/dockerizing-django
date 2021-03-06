let typeChecker = (type) => {
    return typeof type !== 'undefined' && type !== null;
}

let hasLocation = (tweet) => {
    return true;
    //return tweet.user.geo_enabled;
};

let hasCoordinates = (tweet) => {
    return typeChecker(tweet.coordinates) || 
           typeChecker(tweet.place);
           //typeChecker(tweet.places.bounding_box.coordinates);
};

module.exports = {
    filter: (tweet) => {
        console.log(`BEFORE FILTERING: Tweet username: ${tweet.user.name}`);
        let arr = [tweet];
        arr = arr.filter(hasLocation)
                 .filter(hasCoordinates);
        return typeof arr[0] === 'undefined' ? null : arr[0];
    }
}