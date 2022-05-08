
const fs = require('fs');

var i;

  for(i=0;i<=24;i++){
    const fileName ="./"+i+'.json';
    const file = require(fileName);
    
    file.name = "Number"+i;
    file.image = i+".png";
    file.properties.files[0].uri = i+".png";
    file.properties.creators[0].address = "9cusA8UGKHPBM9U6pEgWGe8CN2dyuWEALxu1wQe3QBd2";
        
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log('writing to ' + fileName);
    });
}
