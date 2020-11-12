function shuffle(size){
    var image = document.createElement("img")
    image.src = "zdjecie.png"
    var imageWidth = image.width
    var imageHeight = image.height
    
    var canvasList = []
    
    //document.body.appendChild(image)
    
    var imagePartWidth = Math.floor(imageWidth/size)
    var imagePartHeight = Math.floor(imageHeight/size)
    var area = document.createElement("div")
    area.style.border = "1px black solid"
    for(i = 0; i<size;i++){
        imagePartHeight= Math.floor(imageHeight/size)*i
        for(j = 0; j<size; j++){
            if(j == size-1 && i == size-1){
                console.log("ababa")
            }else{
                imagePartWidth=Math.floor(imageWidth/size)*j
                var canvas = document.createElement("canvas")
                canvas.style.marginRight="2px"
                canvas.width = Math.floor(imageWidth/size)
                canvas.height = Math.floor(imageHeight/size)
                canvas.getContext('2d').drawImage(image, imagePartWidth, imagePartHeight, Math.floor(imageWidth/size), Math.floor(imageHeight/size),0,0, Math.floor(imageWidth/size),Math.floor(imageHeight/size))
                console.log("rysuje kwadrat o punktach startowych "+imagePartWidth+" "+imagePartHeight)
                area.appendChild(canvas)
                canvasList.push(canvas)
            }
        }
        var clearBoth = document.createElement("div")
        clearBoth.style.margin="0 px"
        clearBoth.style.clear="both"
        area.appendChild(clearBoth)
        imagePartWidth=Math.floor(imageWidth/size)
        

    }
    document.body.appendChild(area)
    console.log(canvasList)
    console.log(imagePartHeight, imagePartWidth)
}