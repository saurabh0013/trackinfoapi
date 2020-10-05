const request =  require('request-promise');
const cheerio = require('cheerio');

let baseurl = "https://ekartlogistics.com/track/";



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
        let trackingId = $("body > div.grey-bg.p-t-b-2 > div:nth-child(1) > div > div.col-sm-6.col-md-6.col-lg-8 > h4").text()
        trackingData.push({trackingId})

      for (let i =2 ;i>=1;i++)
        {
            let date = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").text();
            let time = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").text();
            let place = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").text()
            let status = $("#no-more-tables > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").text();
            if (date =='')
            break;
            trackingData.push({
                
                date,
                time,
                place,
                status
            });
    
        }   
       return trackingData;
        
    }
    
    catch(err){
        return ({err:'Invalid Id'});
    }
}

module.exports = track_ekart;