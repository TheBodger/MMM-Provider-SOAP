var package =
{
	type: 'visualcrossing', //mandatory //no spaces

	baseurl: 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx',//optional
	basedata: `<?xml version="1.0"?>
		< SOAP - ENV: Envelope xmlns: SOAP - ENV="http://schemas.xmlsoap.org/soap/envelope/" 
				xmlns: ns1="http://thalesgroup.com/RTTI/2016-02-16/ldb/"
				xmlns: ns2 = "http://thalesgroup.com/RTTI/2013-11-28/Token/types" >
			  <SOAP-ENV:Header>
				<ns2:AccessToken>
				  <ns2:TokenValue>76535a31-8dba-49ea-81e9-96fc479e00e4</ns2:TokenValue>
				</ns2:AccessToken>
			  </SOAP-ENV:Header>
			  <SOAP-ENV:Body>
				<ns1:GetDepBoardWithDetailsRequest>
				  <ns1:crs>ACT</ns1:crs>

				</ns1:GetDepBoardWithDetailsRequest>
			  </SOAP-ENV:Body>
			</SOAP - ENV: Envelope > `,
	baseheaders: ("Content-Type", "text/xml;charset=UTF-8", "SOAPAction", "http://thalesgroup.com/RTTI/2016-02-16/ldb/GetDepBoardWithDetails"),


	baseaddress: 'days', //default is null = root
	itemstype: 'array', //default is array
	input: 'URL',
	fields: [//mandatory
		{ name: { key: true, outputname: 'location', } }, //this is a cludge to force the next field to use the outputname otherwise it will be called subject !!
		{ datetime: { outputname: 'date', inputtype: 't', timestampformat: 'YYY-MM-DD', outputtype: 't' } }, //as this is the 1st entry it will be a key it will be output as subject
		{ moonphase: { inputtype: 'n', outputname: 'moonphase', } },// Rep is an array so we need to loop through the data generating records for each one 
		{ moonrise: { inputtype: 'd', outputname: 'moonrise', } },
		{ moonset: { inputtype: 'd', outputname: 'moonset', outputtype: 'd', } },
	],

}

//where moonphase is: from 0 (the new moon) to 0.5 (the full moon) and back to 1 (the next new moon)

//moonrise (day only, optional) – The formatted time of the moonrise (For example “2022-05-23T02:38:10”)

//moonriseEpoch(day only, optional) – moonrise time specified as number of seconds since 1st January 1970 in UTC time

//moonset(day only, optional) – The formatted time of the moonset(For example “2022 - 05 - 23T13: 40: 07”)

//moonsetEpoch(day only, optional) – moonset time specified as number of seconds since 1st January 1970 in UTC time