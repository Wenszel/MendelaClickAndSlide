var isImageGenerated = false
var imagePartTable = []
var emptyPart
function generatePuzzle(size){
    if(isImageGenerated){
        document.getElementById("area").innerHTML=" "
        imagePartTable=[]
    }
    var image = document.createElement("img")
    image.src = "zdjecie.png"
    var imageWidth = image.width
    var imageHeight = image.height
    var imagePartWidth = Math.floor(imageWidth/size)
    var imagePartHeight = Math.floor(imageHeight/size)
    emptyPart = {
        x: size-1,
        y: size-1
    }
    
    for(let i = 0; i<size;i++){
        for(let j = 0; j<size;j++){
        var imagePart = {
            xIndex: j*imagePartWidth,
            yIndex: i*imagePartHeight,
            correctXIndex: j,
            correctYIndex: i,
            generateImagePart: function(){
                var canvas = document.createElement("canvas")
                canvas.width = imagePartWidth
                canvas.height = imagePartHeight
                canvas.getContext('2d').drawImage(image, this.xIndex, this.yIndex, imageWidth/size,imageHeight/size,0,0, imageWidth/size,imageHeight/size)
                canvas.style.left= this.xIndex+"px"
                canvas.style.top = this.yIndex+"px"
                canvas.addEventListener("click", this.changePosition)
                area.appendChild(canvas)
            },
            thisCanvas: null,
            changePosition: function(){
               if(emptyPart.x==j+1 || emptyPart.x==j-1 || emptyPart.y==i-1 ||emptyPart.y==i+1){
                    this.xIndex = emptyPart.x*imagePartWidth
                    this.yIndex = emptyPart.y*imagePartHeight
                    this.style.left = this.xIndex+"px"
                    this.style.top = this.yIndex+"px"
                    emptyPart.x = j
                    emptyPart.y = i
               }     
            }, 
        }
        if(!(j == size-1 && i == size-1)){
            imagePart.generateImagePart()  
        }
        imagePartTable.push(imagePart)
        
    }

}
    isImageGenerated=true
}