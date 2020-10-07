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
  let comment;
  var len;
        if(response.data[0].receiverName == 'null'){
            comment='';
            date='';
            time='';
            status='';
            place='';
        }
        else{
         
         
         len  =  response.data[0].scans.length;
         for (let i =len-1; i>=0;i--){
         status =  response.data[0].scans[i].status;
         dateTime = response.data[0].scans[i].scanDateTime;
         place=response.data[0].scans[i].scannedLocation;
         date =  dateTime.slice(0,10);
         time = dateTime.slice(11,16);
         comment =response.data[0].scans[i].instructions;
        
         trackingData.push({
                
                date,
                time,
                status,
                place,
                comment
            });
        }
    }
        
       return trackingData;
        
    }
    
    catch(err){
        return ({err:'Invalid Id'});
    }
}

module.exports = track_delhivery;