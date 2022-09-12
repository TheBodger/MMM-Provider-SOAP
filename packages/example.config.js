{
    module: "MMM-Provider-JSON",
    config: {
        consumerids: ["arrivalsBOS",], //mandatory ID of the consumer receiving the data from the module
        id: 'FlightArrivalsBOS', //mandatory unique ID
            baseurl: 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx',//british rail live updates version 9
            basedata: '',
            baseheaders: '',
        package: 'BritishRailDeparturesReading', //name of the package that contains a standard set of config details
        urlparams: { apikey: 'enter your api key here', airportcode: 'BOS' }, //parameters that are embedded into the baseURL, such as an api key and the airport of interest (Heathrow)
        filename: 'flightsarrivingLHR.json', //the name of an output file containing the details sent to the consumer for debug usage etc

},

