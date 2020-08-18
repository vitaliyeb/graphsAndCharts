

(()=>{

    function createGraphs(context, canvasWidth, canvasHeight, {division, graphs}){
        this.divisionValue = [];
        this.paintCoordinate = (index)=> {
            let coordinates = graphs[index];
            let steepX = canvasWidth / (coordinates['coordinates'].length-1);
            let steepY = canvasHeight/ Math.max(...division);
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = coordinates['color'];
            coordinates['coordinates'].map(([x, y])=>context.lineTo(x*steepX, y*steepY+1));
            context.stroke();
        };
        this.divisionField = ()=> {
            let indentSize = canvasHeight/division.length;
            division.reverse().map((el, index) => this.paintHorizontaleLine(indentSize*index+1, el, '#D2D2D2'));
            this.paintHorizontaleLine(canvasHeight-1, '', '#D2D2D2')
        };
        this.paintDivisionValue = () => {
            this.divisionValue.map(([el, x, y])=>{
                context.font = 'bold 12px cursive';
                context.fillText( el, x, y);
            });
        };
        this.paintHorizontaleLine = (y, el, color)=>{
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = color;
            context.moveTo(0, y);
            context.lineTo(canvasWidth, y);
            context.stroke();
            this.divisionValue.push([el, 0, y+14])
        }
    }

    let graphsData = {
            division: [2, 4, 6],
            graphs: [
                {
                    color: 'green',
                    coordinates: new Array(30).fill('').map((el, i) => [i, Math.round(Math.random()*6)])
                },
                {
                    color: 'red',
                    coordinates: new Array(30).fill('').map((el, i) => [i, Math.round(Math.random()*6)])
                }
            ]
        }
    
    let allArcGraphs = $('.graphs');

    allArcGraphs.map(function(){        
        let $el = $(this);
        let canvas = $($el).find('canvas')[0];
        let canvasWidth = 358;
        let canvasHeight = 122;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        let context = canvas.getContext('2d');
        let field = new createGraphs(context, canvasWidth, canvasHeight, graphsData);

        field.divisionField();
        graphsData.graphs.map((el, i)=>field.paintCoordinate(i));
        field.paintDivisionValue();
        



        

    });


})()