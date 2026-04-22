const categoryUniueName = (originalName)=>{
   const uniqueName = Date.now().toString(36)+Math.random().toString(36);
   return `img_${uniqueName}+${originalName}`;
}

module.exports = categoryUniueName;