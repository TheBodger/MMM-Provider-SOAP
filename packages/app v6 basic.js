var url = "https://www.w3schools.com/xml/tempconvert.asmx";

url = "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb6.asmx";
url = "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb9.asmx";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        var parseString = require('xml2js').parseString;
        parseString(xhr.responseText, function (err, result) {
            //console.log(result["soap:Envelope"]["soap:Body"][0]["GetDepartureBoardResponse"][0]["GetStationBoardResult"][0]["lt2:trainServices"][0]["lt2:service"]);
            console.log(result["soap:Envelope"]["soap:Body"][0]["GetDepBoardWithDetailsResponse"][0]["GetStationBoardResult"][0]["lt5:trainServices"][0]["lt5:service"]);
            
            for (let service of result["soap:Envelope"]["soap:Body"][0]["GetDepBoardWithDetailsResponse"][0]["GetStationBoardResult"][0]["lt5:trainServices"][0]["lt5:service"])
            {
                console.log(service["lt4:std"])
                console.log(service["lt4:etd"])
                console.log(service["lt5:destination"][0]["lt4:location"][0]["lt4:locationName"])
                for (let callingAt of service["lt5:subsequentCallingPoints"][0]["lt4:callingPointList"][0]["lt4:callingPoint"])
                {
                    console.log("  ",callingAt["lt4:locationName"])
                }
            }
            console.log("finsihed")
        });
    }
};

var data = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/">
      <Fahrenheit>75</Fahrenheit>
    </FahrenheitToCelsius>
  </soap12:Body>
</soap12:Envelope>`;


//<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
//xmlns: soap12 = "http://schemas.xmlsoap.org/wsdl/soap12/" xmlns: tns = "http://thalesgroup.com/RTTI/2021-11-01/ldb/" targetNamespace = "http://thalesgroup.com/RTTI/2021-11-01/ldb/" >
//<wsdl:import namespace="http://thalesgroup.com/RTTI/2021-11-01/ldb/" location="rtti_2021-11-01_ldb.wsdl"/>
//<wsdl:service name="ldb">
//<wsdl:port name="LDBServiceSoap" binding="tns:LDBServiceSoap">
//<soap:address location="https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb12.asmx"/>
//</wsdl:port>
//<wsdl:port name="LDBServiceSoap12" binding="tns:LDBServiceSoap12">
//<soap12:address location="https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb12.asmx"/>
//</wsdl:port>
//</wsdl:service>
//</wsdl: definitions >


data = `<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:ns1="http://thalesgroup.com/RTTI/2014-02-20/ldb/"
    xmlns:ns2="http://thalesgroup.com/RTTI/2013-11-28/Token/types">
  <SOAP-ENV:Header>
    <ns2:AccessToken>
      <ns2:TokenValue>76535a31-8dba-49ea-81e9-96fc479e00e4</ns2:TokenValue>
    </ns2:AccessToken>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns1:GetDepartureBoardRequest>
      <ns1:crs>ACT</ns1:crs>

    </ns1:GetDepartureBoardRequest>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

data = `<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:ns1="http://thalesgroup.com/RTTI/2016-02-16/ldb/"
    xmlns:ns2="http://thalesgroup.com/RTTI/2013-11-28/Token/types">
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
</SOAP-ENV:Envelope>`;

xhr.open("POST", url);
//xhr.setRequestHeader("Content-Type", "application/soap+xml");
xhr.setRequestHeader("Content-Type", "text/xml;charset=UTF-8", "SOAPAction", "http://thalesgroup.com/RTTI/2016-02-16/ldb/GetDepBoardWithDetails")//, "Accept-encoding", "gzip,x-gzip,deflate,x-bzip2")
xhr.send(data);

//    <ns1:GetDepartureBoardRequest>
//<ns1:crs>ACT</ns1:crs>
//</ns1: GetDepartureBoardRequest >
