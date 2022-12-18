export const returnStringified = (obj) => {
    const seen = []

    const data = JSON.stringify(obj, function(key, val) {
        if (val != null && typeof val == "object") {
             if (seen.indexOf(val) >= 0) {
                 return;
             }
             seen.push(val);
         }
         return val;
     });
     return data
}