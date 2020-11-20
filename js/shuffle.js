var picture = {
    pictureImage: null,
    numberOfPicture:0,
    loadPicture: function(){
        var image = document.createElement("img")
        image.src = "img/img"+this.numberOfPicture+".jpg"
        this.pictureImage = image
        image.style.width = this.pictureWidth
        image.style.height = this.pictureHeight
    },
    changePicture: function(action){
        this.numberOfPicture+=action
        if(this.numberOfPicture<0){
            this.numberOfPicture = 3
        }
        if(this.numberOfPicture>3){
            this.numberOfPicture = 0
        }
        var preview = document.querySelector("#preview > img")
        var newImage = document.createElement("img")
        newImage.src="img/img"+this.numberOfPicture+".jpg"
        newImage.style.width= "200px"
        newImage.style.height = "200px"
        var previewBox = document.querySelector("#preview")
        previewBox.appendChild(newImage)
        previewBox.scrollTo((this.numberOfPicture*200),0)
        preview.src ="img/img"+this.numberOfPicture+".jpg"
    }
}
var timer = {
    hours: 0,
    minutes: 0,
    secundes: 0,
    milisecundes:0,
    startTimer: function(){
        var timer = document.createElement("div")
        timer.innerHTML = this.hours+":"+this.minutes+":"+this.secundes+":"+this.milisecundes
        //timer.innerHTML = "chuj"
        document.querySelector("body").appendChild(timer)
        setInterval(()=>{
            this.milisecundes++
            if(this.milisecundes==1000){
                this.milisecundes=0
            }
            timer.innerHTML =this.hours+":"+this.minutes+":"+this.secundes+":"+this.milisecundes
        },1)
        setInterval(()=>{
            this.secundes++
            if(this.secundes==60){
                this.secundes=0
            }
            timer.innerHTML = this.hours+":"+this.minutes+":"+this.secundes+":"+this.milisecundes
        },1000)
        setInterval(()=>{
            this.minutes++
            if(this.minutes==60){
                this.minutes=0
            }
            timer.innerHTML = this.hours+":"+this.minutes+":"+this.secundes+":"+this.milisecundes
        },60000)
        setInterval(()=>{
            this.hours++
            timer.innerHTML = this.hours+":"+this.minutes+":"+this.secundes+":"+this.milisecundes
        },360000)
    }
}
var playground = {
    areaElement: document.getElementById("area"),
    size: null,
    imagePartWidth: undefined,
    imagePartHeight: undefined,
    imagePartArray: [],
    emptyPart: {
        xPosition: null,
        yPosition: null
    },
    generatePlayground: function(size){
        picture.loadPicture()
        this.imagePartWidth = Math.floor(picture.pictureImage.width/size)
        this.imagePartHeight = Math.floor(picture.pictureImage.height/size)
        this.areaElement.style.width = this.imagePartWidth*size +"px"
        this.areaElement.style.height = this.imagePartHeight*size+"px"
        this.size = size
        for(var i = 0; i<size;i++){
            for(var j = 0; j<size;j++){
                if(j!=size-1 || i!=size-1){
                    let imagePart = {
                        xPosition: null,
                        yPosition: null,
                        correctXPosition: null,
                        correctYPosition: null,
                        canvasImage: null,
                        generateImagePart: function(){
                            this.xPosition = j*playground.imagePartWidth
                            this.yPosition = i*playground.imagePartHeight
                            this.correctXPosition = j*playground.imagePartWidth
                            this.correctYPosition = i*playground.imagePartHeight
                            var canvas = document.createElement("canvas")
                            canvas.width = playground.imagePartWidth
                            canvas.height = playground.imagePartHeight
                            canvas.getContext('2d').drawImage(picture.pictureImage, this.xPosition, this.yPosition, playground.imagePartWidth,playground.imagePartHeight,0,0, playground.imagePartWidth,playground.imagePartHeight)
                            canvas.style.left= this.xPosition+"px"
                            canvas.style.top = this.yPosition+"px"
                            canvas.onclick= ()=> {
                                if (
                                ((playground.emptyPart.xPosition == imagePart.xPosition)&& ((playground.emptyPart.yPosition==imagePart.yPosition-playground.imagePartWidth)||(playground.emptyPart.yPosition==imagePart.yPosition+playground.imagePartWidth)))||
                                ((playground.emptyPart.yPosition == imagePart.yPosition)&& ((playground.emptyPart.xPosition==imagePart.xPosition-playground.imagePartWidth)||(playground.emptyPart.xPosition==imagePart.xPosition+playground.imagePartWidth)))
                                ){
                                
                                canvas.style.left = playground.emptyPart.xPosition+"px"
                                canvas.style.top = playground.emptyPart.yPosition+"px"
                                playground.emptyPart.xPosition = imagePart.xPosition
                                playground.emptyPart.yPosition = imagePart.yPosition
                                imagePart.xPosition = parseInt(canvas.style.left)
                                imagePart.yPosition = parseInt(canvas.style.top)
                                }
                            }
                            playground.areaElement.appendChild(canvas)
                        },

                    }
                this.imagePartArray.push(imagePart)
                imagePart.generateImagePart()
                }else{
                    playground.emptyPart.xPosition = playground.imagePartWidth*j
                    playground.emptyPart.yPosition = playground.imagePartHeight*i
                }
            }
        }
        this.shufflePlayground()
        timer.startTimer()
    },
    shufflePlayground: function(){
        let numberOfMoves = Math.pow(this.size,3)
        let nextMove = {
            xPosition: null,
            yPosition: null,
            setNextMove: ()=>{
                let XorY = Math.floor(Math.random()) //dla 0 zmieniamy pozycji po X dla 1 po Y
                let direction = Math.floor(Math.random())
                if(XorY==0){
                    this.yPosition = playground.emptyPart.yPosition
                    if(direction==0){
                        this.xPosition = playground.emptyPart.xPosition+playground.imagePartWidth
                    }else{
                        this.xPosition = playground.emptyPart.xPosition-playground.imagePartWidth
                    }
                }else{
                    this.yPosition = playground.emptyPart.yPosition
                    if(direction==0){
                        this.xPosition = playground.emptyPart+playground.imagePartWidth
                    }else{
                        this.xPosition = playground.emptyPart-playground.imagePartWidth
                    }
                }
                
                
            }
        }
    }      
}
