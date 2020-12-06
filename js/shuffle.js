var picture = {
    pictureImage: null,
    numberOfPicture:0,
    loadPicture: function(){
        var image = new Image()
        image.src = "img/img"+this.numberOfPicture+".jpg"
        this.pictureImage = image
        image.style.width = this.pictureWidth
        image.style.height = this.pictureHeight
    },
    changePicture: function(action){
        var oldImage = new Image()
        oldImage.src="img/img"+this.numberOfPicture+".jpg"
        this.numberOfPicture+=action
        if(this.numberOfPicture<0) this.numberOfPicture = 3
        if(this.numberOfPicture>3) this.numberOfPicture = 0 
        var newImage = new Image()
        newImage.src="img/img"+this.numberOfPicture+".jpg"
        var previewBox = document.querySelector("#preview")
        previewBox.innerHTML=""
        if(action==1){
            previewBox.appendChild(oldImage)
            previewBox.appendChild(newImage)        
        }
        if(action==-1){
            previewBox.appendChild(newImage)
            previewBox.appendChild(oldImage)
            previewBox.style.scrollBehavior = "auto"
            previewBox.scrollBy(200,0)
        }
        setTimeout(()=>{
            previewBox.style.scrollBehavior = "smooth"
            if(action==1)previewBox.scrollBy(200,0)
            if(action==-1)previewBox.scrollBy(-200,0)
            
        },100)    
        setTimeout(()=>{
            previewBox.removeChild(oldImage)
            laderboard.openLaderboard(3)
        },500) 
    }
}
var timer = {
    generateTimer: function(){
        var timer = document.createElement("div")
        hour1 = new Image()
        hour1.src = "img/cyferki/c0.gif"
        hour2 = new Image()
        hour2.src = "img/cyferki/c0.gif"
        colon1 = new Image()
        colon1.src = "img/cyferki/colon.gif"
        minute1 = new Image()
        minute1.src = "img/cyferki/c0.gif"
        minute2 = new Image()
        minute2.src = "img/cyferki/c0.gif"
        colon2 = new Image()
        colon2.src = "img/cyferki/colon.gif"
        secunde1 = new Image()
        secunde1.src = "img/cyferki/c0.gif"
        secunde2= new Image()
        secunde2.src = "img/cyferki/c0.gif"
        dot = new Image()
        dot.src = "img/cyferki/dot.gif"
        milisecunde1= new Image()
        milisecunde1.src = "img/cyferki/c0.gif"
        milisecunde2= new Image()
        milisecunde2.src = "img/cyferki/c0.gif"
        milisecunde3= new Image() 
        milisecunde3.src = "img/cyferki/c0.gif"
        timer.appendChild(hour1)
        timer.appendChild(hour2)
        timer.appendChild(colon1)
        timer.appendChild(minute1)
        timer.appendChild(minute2)
        timer.appendChild(colon2)
        timer.appendChild(secunde1)
        timer.appendChild(secunde2)
        timer.appendChild(dot)
        timer.appendChild(milisecunde1)
        timer.appendChild(milisecunde2)
        timer.appendChild(milisecunde3)
        document.body.appendChild(timer)
        document.querySelectorAll(".buttons>button").disabled=false   
    },
    startTimer: function(){
        time = Date.now()
        f = () =>{
            actuallTime = Date.now()
            timePassed= actuallTime-time
            dateFromMs = new Date(timePassed)
            hours = (dateFromMs.getHours()-1).toString()
            minutes = (dateFromMs.getMinutes()).toString()
            secundes = (dateFromMs.getSeconds()).toString()
            millisecundes = (dateFromMs.getMilliseconds()).toString()
            while(hours.length<2){
                hours="0"+hours
            }
            while(minutes.length<2){
                minutes="0"+minutes
            }
            while(secundes.length<2){
                secundes="0"+secundes
            }
            while(millisecundes.length<3){
                millisecundes="0"+millisecundes
            }
            timerTime = hours+minutes+secundes+millisecundes
            milisecunde3.src = "img/cyferki/c"+timerTime[8]+".gif"
            milisecunde2.src= "img/cyferki/c"+timerTime[7]+".gif"
            milisecunde1.src = "img/cyferki/c"+timerTime[6]+".gif"
            secunde2.src = "img/cyferki/c"+timerTime[5]+".gif"
            secunde1.src = "img/cyferki/c"+timerTime[4]+".gif"
            minute2.src = "img/cyferki/c"+timerTime[3]+".gif"
            minute1.src = "img/cyferki/c"+timerTime[2]+".gif"
            hour2.src = "img/cyferki/c"+timerTime[1]+".gif"
            hour1.src = "img/cyferki/c"+timerTime[0]+".gif"
            timerTime = hours+":"+minutes+":"+secundes+"."+millisecundes
           }
           document.querySelectorAll(".buttons>button").forEach((i)=>i.disabled=false)
           timerInterval = setInterval(f,1)   
    },
    returnTime: function(){
        return timerTime
    },
    resetTimer: function(){
        time = Date.now()
        timerTime = ""
        milisecunde3.src = "img/cyferki/c0.gif"
        milisecunde2.src= "img/cyferki/c0.gif"
        milisecunde1.src = "img/cyferki/c0.gif"
        secunde2.src = "img/cyferki/c0.gif"
        secunde1.src = "img/cyferki/c0.gif"
        minute2.src = "img/cyferki/c0.gif"
        minute1.src = "img/cyferki/c0.gif"
        hour2.src = "img/cyferki/c0.gif"
        hour1.src = "img/cyferki/c0.gif"
    },
    stopTimer: function(){
        clearInterval(timerInterval)
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
    isGenerated: false,
    winChecker: function(){
        var isWin = true
        for(i=0;i<playground.imagePartArray.length;i++){
            if(playground.imagePartArray[i].correctXPosition == playground.imagePartArray[i].xPosition&&
            playground.imagePartArray[i].correctYPosition == playground.imagePartArray[i].yPosition){
            continue     
        }else{
            isWin = false
            break        
        }
        }
        if(isWin){
            timer.stopTimer()
            setTimeout(()=>{
                let time = timer.returnTime()
                nameOfWinner = prompt("Wygrałeś w czasie "+time+" \nPodaj nazwę do zapisania wyniku:")
                document.cookie = playground.size+""+picture.numberOfPicture+nameOfWinner+"="+time+";"
                laderboard.openLaderboard(playground.size)
            },100)
            //timer.resetTimer()   
        }
    },
    generatePlayground: function(size){
        if(this.isGenerated){
            document.getElementById("area").innerHTML=" "
            this.imagePartArray = []
            this.emptyPart.xPosition= null
            this.emptyPart.yPosition = null
            timer.resetTimer()
            timer.stopTimer()
        }else{
            timer.generateTimer()
        }
        document.querySelectorAll(".buttons>button").forEach((i)=>i.disabled=true)
        this.isGenerated = true
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
                                if(
                                ((playground.emptyPart.xPosition == imagePart.xPosition)&&((playground.emptyPart.yPosition==imagePart.yPosition-playground.imagePartWidth)||(playground.emptyPart.yPosition==imagePart.yPosition+playground.imagePartWidth)))||
                                ((playground.emptyPart.yPosition == imagePart.yPosition)&&((playground.emptyPart.xPosition==imagePart.xPosition-playground.imagePartWidth)||(playground.emptyPart.xPosition==imagePart.xPosition+playground.imagePartWidth)))
                                ){ 
                                canvas.style.left = playground.emptyPart.xPosition+"px"
                                canvas.style.top = playground.emptyPart.yPosition+"px"
                                playground.emptyPart.xPosition = imagePart.xPosition
                                playground.emptyPart.yPosition = imagePart.yPosition
                                imagePart.xPosition = parseInt(canvas.style.left)
                                imagePart.yPosition = parseInt(canvas.style.top)
                                playground.winChecker()
                                }
                            }
                            this.canvasImage=canvas
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
        var numberOfMoves = Math.pow(this.size,3)*2
        let counter = 0
        do{
            this.shufflePlayground(counter)
            counter++
        }while(counter<numberOfMoves)
        setTimeout(timer.startTimer, numberOfMoves*10)
    },
    findPossibleMoves: function(){
        possibleMovesArray = []
        if(playground.emptyPart.yPosition-playground.imagePartWidth>=0){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition,
                yPosition: playground.emptyPart.yPosition-playground.imagePartWidth
            }
            possibleMovesArray.push(possibleMoves)
        } 
        if(playground.emptyPart.yPosition+playground.imagePartWidth<=picture.pictureImage.width-playground.imagePartWidth)
        { 
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition,
                yPosition: playground.emptyPart.yPosition+playground.imagePartWidth
            }
            possibleMovesArray.push(possibleMoves)
        }
        if(playground.emptyPart.xPosition-playground.imagePartWidth>=0){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition-playground.imagePartWidth,
                yPosition: playground.emptyPart.yPosition,
            }
            possibleMovesArray.push(possibleMoves)
        }
        if(playground.emptyPart.xPosition+playground.imagePartWidth<=picture.pictureImage.width-playground.imagePartWidth){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition+playground.imagePartWidth,
                yPosition: playground.emptyPart.yPosition
            }
            possibleMovesArray.push(possibleMoves)
        }
        return possibleMovesArray
    },
    shufflePlayground: function(counter){
        setTimeout(()=>{
            let possibleMoves = this.findPossibleMoves()
            let nextMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
            let objectToMove = this.imagePartArray.find( i =>
                i.xPosition == nextMove.xPosition &&
                i.yPosition == nextMove.yPosition
            )
            objectToMove.xPosition = playground.emptyPart.xPosition
            objectToMove.yPosition = playground.emptyPart.yPosition
            objectToMove.canvasImage.style.left = playground.emptyPart.xPosition+"px"
            objectToMove.canvasImage.style.top = playground.emptyPart.yPosition+"px"
            playground.emptyPart.xPosition=  nextMove.xPosition
            playground.emptyPart.yPosition= nextMove.yPosition
        },10*counter)
    }      
}
var laderboard={
    openLaderboard: function(mode){
        let counter = 0
        let list = document.createElement("ol")
        let results = laderboard.sortResults()
        for(let i = 0; i<results.length; i++){
            let modeOfResult = results[i].player.trim()[0]
            let pictureOfResult = results[i].player.trim()[1]
            let player = results[i].player.trim().slice(2)
            let time = results[i].time
            if(modeOfResult==mode && counter<10 && picture.numberOfPicture==pictureOfResult){
                counter++
                let li = document.createElement("li")
                li.textContent=player+" - "+time
                list.appendChild(li)
            }
        }
        document.getElementById("laderboardResults").innerHTML=""
        document.getElementById("laderboardResults").appendChild(list)
    },
    sortResults:function(){
        let results = document.cookie.split(";")
        let resultsObj = []
        results.forEach((i)=>{
            let result = i.split("=")
            let resultObj = {
                player: result[0],
                time: result[1]
            }
            resultsObj.push(resultObj)
        })
        resultsObj = resultsObj.sort((a,b)=>{
            return parseFloat(a.time.replaceAll(":","").replace(".",""))-parseFloat(b.time.replaceAll(":","").replace(".",""))
        })
        return resultsObj
    }
}