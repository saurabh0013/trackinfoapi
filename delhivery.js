const request =  require('request-promise');


let baseurl = "https://dlv-api.delhivery.com/v3/unified-tracking?wbn=";
let trackingData = [];


async function track_delhivery(Id){
    
    const url = baseurl+Id;
    try
    {
        
  
    
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
        if(response.data[0].message == 'Success'){
           
         
         
         len  =  response.data[0].scans.length;
         for (let i =len-1; i>=0;i--){
         status =  response.data[0].status[i].status;
         dateTime = response.data[0].status[i].statusDateTime;
         place=response.data[0].scans[i].scannedLocation;
         date =  dateTime.slice(0,10);
         time = dateTime.slice(11,16);
         comment =response.data[0].status[i].instructions;
        
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