module.exports = function(params) {
  let arrayHandler = require("../API/arrayParsing");
  try {
    //2:check if items array is not empty
    //take array from object and pass to array parrsing function
    let items=params.items;
    let length=items.length;
    for (let index = 0; index < length; index++) 
    {
     
      if( items[index].type=='Section')
      {
        
        console.log(items[index].type)
       
      }else{
        console.log(items[index].type)  
          }
    }
   
    console.log('----parsing end-----')
    
  } catch (error) {
   
    console.log(error);
  }
};
