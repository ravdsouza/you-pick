class PlacesHandler{
    callApi(lat, long, price, radius, callback){
        let url = '/api/places?' + 'lat=' + String(lat) + '&long=' + String(long) + '&price=' + String(price) + '&radius=' + String(radius*1000);

        fetch(url) // Call the fetch function passing the url of the API as a parameter
            .then(res => res.json())
            .then(data => {
                callback(data);
            })
            .catch(function() {
                console.log("oops")
            });
    }
}
export default PlacesHandler;