
const fs = require('fs');

var i;

  for(i=0;i<=24;i++){
    const fileName ="./"+i+'.json';
    const file = require(fileName);
    
    file.name = "Number"+i;
    file.symbol = "MN"
    file.description = "A moonsta is a key into the deepest nft universe.";
    file.image = i+".jpg";
    file.seller_fee_basis_points = 1000;
    file.properties.creators[0].address = "3eaz79wgmM2o5FWiAD9reBQpyyzNDFh4nrAkCyaa2viZ";
    file.properties.files[0].uri = i+".jpg";
    file.properties.files[0].type = "image/jpg";
        
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log('writing to ' + fileName);
    });
}
