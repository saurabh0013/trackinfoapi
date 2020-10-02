const request =  require('request-promise');
const cheerio = require('cheerio');
const json2csv = require('json2csv').Parser;
const fs = require('fs');

let baseurl = "https://www.delhivery.com/track/package/";
const trackingId = "19504131579765";
const url = baseurl+trackingId;


(async () => {
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
            await $('#heading1 > a > span.material-icons.down-icon').click()

            let dateTime =$("#mat-dialog-0 > app-updates-avaible-modal > div.main-container > div:nth-child(1) > div.row.margin-bottom-12 > div:nth-child(1) > div > span").text();
            let place =$("#mat-dialog-0 > app-updates-avaible-modal > div.main-container > div:nth-child(1) > div.row.margin-bottom-12 > div:nth-child(2) > div > span").text()
            let status = $("#mat-dialog-0 > app-updates-avaible-modal > div.main-container > div:nth-child(1) > div:nth-child(2) > div > div > span").text()
           
            trackingData.push({
                dateTime,            
                place,
                status
            });
    
         
        console.log(trackingData);
        let j2cp = new json2csv()
        let csv = j2cp.parse(trackingData)
        fs.writeFileSync("./tracking.csv", csv, "utf-8")
        }
    
    catch(err){
    console.log("\nInvalid Tracking Id\n\n------ Following error was encountered ------\n\n"+err);
    }
})();
