
module.exports=function(obj)
{
let ar=[];
let test=Object.keys(obj[0]);
let value=Object.values(obj[0]);
ar.push(value);
 value=Object.values(obj[1]);
ar.push(value);
console.log(ar);
    return {
        table: {
          body: [test,ar[0],ar[1]]
        }
      }
}