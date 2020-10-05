const request =  require('request-promise');


let baseurl = "https://dlv-web-api.delhivery.com/v2/track?waybillId=";



async function track_delhivery(trackingId){
    
    const url = baseurl+trackingId;
    try
    {
        let trackingData = []
  
    
        const response = await request({
            uri :url ,
            json: true
        });
    
         var len  =  response.data[0].scans.length;
         let status =  response.data[0].scans[len-1].status;
         let dateTime = response.data[0].scans[len-1].scanDateTime;
         let place=response.data[0].scans[len-1].cityLocation;
         let date =  dateTime.slice(0,10);
         let time = dateTime.slice(11,16);
            trackingData.push({
                
                date,
                time,
                status,
                place
            });
    
        
       return trackingData;
        
    }
    
    catch(err){
        return ({err:'Invalid Id'});
    }
}

module.exports = track_delhivery;