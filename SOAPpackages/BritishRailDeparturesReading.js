var package =
{
	type: 'BRDepartureBoard', //mandatory //no spaces

	baseurl: 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx',//optional
	basedata: `<?xml version="1.0"?>
                <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://thalesgroup.com/RTTI/2016-02-16/ldb/" xmlns:ns2="http://thalesgroup.com/RTTI/2013-11-28/Token/types">
                  <SOAP-ENV:Header><ns2:AccessToken><ns2:TokenValue>76535a31-8dba-49ea-81e9-96fc479e00e4</ns2:TokenValue></ns2:AccessToken></SOAP-ENV:Header>
                  <SOAP-ENV:Body><ns1:GetDepBoardWithDetailsRequest><ns1:crs>RDG</ns1:crs></ns1:GetDepBoardWithDetailsRequest></SOAP-ENV:Body>
                </SOAP-ENV:Envelope>`,
	baseheaders: ["Content-Type", "text/xml;charset=UTF-8"],// "SOAPAction", "http://thalesgroup.com/RTTI/2016-02-16/ldb/GetDepBoardWithDetails"],

	rootkey: "soap:Envelope.soap:Body.0.GetDepBoardWithDetailsResponse.0.GetStationBoardResult.0.lt5:trainServices.0.lt5:service",
	fields: [//mandatory
		{ name: { key: true, outputname: 'location', } }, //this is a cludge to force the next field to use the outputname otherwise it will be called subject !!
		{ 'lt4:etd': { outputname: 'estimatedDeparture', } }, 
		{ 'lt4:std': { outputname: 'scheduledDeparture', } }, 
		{ 'lt4:platform': { outputname: 'platform', } },// Rep is an array so we need to loop through the data generating records for each one 
		{ 'lt5:origin.0.lt4:location.0.lt4:locationName': { outputname: 'origin', } },
		{ 'lt5:subsequentCallingPoints.0.lt4:callingPointList.0.lt4:callingPoint': { inputtype:'a', outputname: 'callingPoints'} },
	],

}
