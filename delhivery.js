const request =  require('request-promise');


let baseurl = "https://dlv-web-api.delhivery.com/v2/track?waybillId=";



async function track_delhivery(Id){
    
    const url = baseurl+Id;
    try
    {
        let trackingData = []
  
    
        const response = await request({
            uri :url ,
            json: true
        });
       
  let status;
  let date; 
  let time;
  let place;
  let trackingId;
  var len;
        if(response.data[0].receiverName == 'null'){
            trackingId='';
            date='';
            time='';
            status='';
            place='';
        }
        else{
         trackingId= response.data[0].awb;
         
         len  =  response.data[0].scans.length;
         status =  response.data[0].scans[len-1].status;
         dateTime = response.data[0].scans[len-1].scanDateTime;
         place=response.data[0].scans[len-1].cityLocation;
         date =  dateTime.slice(0,10);
         time = dateTime.slice(11,16);
        }
        trackingData.push({trackingId});
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