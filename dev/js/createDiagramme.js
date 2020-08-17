
(()=>{

    function createArcСhart(context,posX, posY, r){
        this._angle = 0;
        Object.defineProperty(this, 'angle', {
            set: (newAngle) => this._angle+=Math.PI/50*newAngle,
            get: () => this._angle
        });
        this.arcCenter = (r, color)=> {
            context.beginPath();
            context.fillStyle = color;
            context.arc(posX, posY, r, 0, Math.PI*2);
            context.fill();
        };
        this.renderPart = (newAngle, color)=>{
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(posX, posY);
            context.arc(posX, posY, r, this.angle, (()=>this.angle)(this.angle = newAngle));
            context.closePath();
            context.fill();
        };
    }

    let allArcСharts = $('.charts');
    
    allArcСharts.map((ndx,el)=>{
        let $el = $(el);
        let canvas = $el.find('canvas')[0];
        let listItems = $el.find('.charts__list > li');
        let canvasSize = 232;

        canvas.width = canvasSize;
        canvas.height = canvasSize;
        
        let context = canvas.getContext('2d');
        let currentArc = new createArcСhart(context, canvasSize/2, canvasSize/2, canvasSize/2);

        listItems.map((ind, el)=> currentArc.renderPart($(el).attr('data-percent'), $(el).attr('data-color')));
        currentArc.arcCenter(33, '#fff');
    });

})()