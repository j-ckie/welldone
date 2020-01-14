const models = require("../models")

module.exports.getCategories = (req,res,next) => {
  models.Categories.findAll().then((data)=>{ 
      let cat={},anew=[], cats={}
      for(x=0;x<(data.length);x++){
          let all = data[x].category
          cat.category = all 
          anew.push(cat)  
      }
      cats.category = anew
      console.log(cats)
      // console.log(cat)
    }).catch((err)=>{
      console.log(err)
    })
   
  }
