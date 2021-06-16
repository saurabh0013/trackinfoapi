const request =  require('request-promise');
const cheerio = require('cheerio');




async function track_bluedart(trackingId){
    
    var url ="https://www.bluedart.com/web/guest/tracking?p_p_id=innertrackdartportlet_WAR_Track_Dartportlet_INSTANCE_locationportlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_innertrackdartportlet_WAR_Track_Dartportlet_INSTANCE_locationportlet_javax.portlet.action=intertrackAction&p_auth=jswp16WE&_innertrackdartportlet_WAR_Track_Dartportlet_INSTANCE_locationportlet_trackingNo="+trackingId+"&_innertrackdartportlet_WAR_Track_Dartportlet_INSTANCE_locationportlet_selectedVal=0";
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
 

   
     for (let i = 1 ; ; i++){
            let date = $("#SCAN"+trackingId+" > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").text();
            let time = $("#SCAN"+trackingId+" > div > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").text();
            let place = $("#SCAN"+trackingId+" > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").text()
            let status = $("#SCAN"+trackingId+" > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").text();
            let comment = $("#SCAN"+trackingId+" > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").text();
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

module.exports = track_bluedart;