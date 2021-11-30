const request =  require('request-promise');
const cheerio = require('cheerio');

let baseurl = "https://ekartlogistics.com/shipmenttrack/";



async function track_ekart(trackingId){
    
    const url = baseurl+trackingId;
    try{
        let trackingData = []
  
    
        const response = await request({
            uri :url ,
            headers : {
                accept: 
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
            },
            gzip: true,
        });
        
        let $ = cheerio.load(response)
        // let trackingId = $("body > div.grey-bg.p-t-b-2 > div:nth-child(1) > div > div.col-sm-6.col-md-6.col-lg-8 > h4").text();
        // trackingId = trackingId.slice(13);
        // trackingData.push({trackingId})

   
     for (let i = 1 ; ; i++){
            let date = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td[data-title = Date]").text();
            let time = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td[data-title = Time]").text();
            let place = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td[data-title = Place]").text()
            let status = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td[data-title = Status]").text();
            let comment = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td[data-title = Status]").text();
           if (date =='')
           break;
            trackingData.push({
                
                date,
                time,
                place,
                status,
                comment
            });
        }
        
       return trackingData;
        
    }
    
    catch(err){
        return ({err:'Invalid Id'});
    }
}

module.exports = track_ekart;