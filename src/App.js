import React, { Component } from 'react';
import './App.css';
import * as createjs from 'createjs-module';
import c from 'canvas2image';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphics : []
        };
        this.clickButton = this.clickButton.bind(this);
    }
    componentDidMount() {
        const stage = new createjs.Stage('canvas');

        const background = stage.addChild(new createjs.Shape());
        background.graphics.beginFill('rgb(255, 180, 0)').drawRect(0,0,1000,400);
        background.x=0;
        background.y=0;
        background.on('click', (e) => {
            const g = new createjs.Graphics();
            g.alpha=1;
            g.setStrokeStyle(1, 'round', 1, 0, true);
            g.setStrokeDash([2, 1], 0);
            g.beginStroke('0xFFFFFF');

            let leftX=0;
            let rightX=1000;
            let downY=0;
            let upY=400;

            let mouseX = stage.mouseX;
            let mouseY = stage.mouseY;


            let nearestLeft = leftX;
            let nearestRight = rightX;
            let nearestTop = upY;
            let nearestBottom = downY;



            // let nearestTopO = {};
            // let nearestBottomO = {};
            // for(let o of this.state.graphics) {
            //     if(o.y<mouseY && o.y>nearestBottom)
            //         nearestBottomO = o;
            //     if(o.y>mouseY && o.y<nearestTop)
            //         nearestTopO = o;
            // }
            // for(let obj of this.state.graphics) {
            //     // if(obj.x<=mouseX && obj.x>=nearestLeft) {
            //     //     if((nearestTopO.x>=mouseX || nearestBottomO.x>=mouseX))
            //             nearestLeft = obj.x;
            //     }
            //     if(obj.x>=mouseX && obj.x<=nearestRight)
            //     // {
            //     //     let nearestTopO = {};
            //     //     let nearestBottomO = {};
            //     //     for(let o of this.state.graphics) {
            //     //         if(o.y<mouseY && o.y>nearestBottom)
            //     //             nearestBottomO = o;
            //     //         if(o.y>mouseY && o.y<nearestTop)
            //     //             nearestTopO = o;
            //     //     }
            //     //
            //     //     if(nearestTopO.x>mouseX || nearestBottomO.x>mouseX)
            //             nearestRight = obj.x;
            //     //
            //     // }
            //     if(obj.y<=mouseY && obj.y>=nearestBottom)
            //     //     let nearestRightO = {};
            //     //     let nearestLeftO = {};
            //     //     for(let o of this.state.graphics) {
            //     //         if(o.y<mouseY && o.y>nearestLeft)
            //     //             nearestLeftO = o;
            //     //         if(o.y>mouseY && o.y<nearestRight)
            //     //             nearestRightO = o;
            //     //     }
            //     //
            //     //     if(nearestRightO.y<mouseY || nearestLeftO.y<mouseY)
            //             nearestBottom = obj.y;
            //     //
            //     // }
            //     if(obj.y>=mouseY && obj.y<=nearestTop)
            //     //     let nearestRightO = {};
            //     //     let nearestLeftO = {};
            //     //     for(let o of this.state.graphics) {
            //     //         if(o.y<mouseY && o.y>nearestLeft)
            //     //             nearestLeftO = o;
            //     //         if(o.y>mouseY && o.y<nearestRight)
            //     //             nearestRightO = o;
            //     //     }
            //     //
            //     //     if(nearestRightO.y<mouseY || nearestLeftO.y<mouseY)
            //             nearestTop = obj.y;
            //     //
            //     // }
                leftX = nearestLeft;
                rightX = nearestRight;
                downY = nearestBottom;
                upY = nearestTop;


            g.moveTo(leftX, mouseY);
            g.lineTo(rightX, mouseY);
            g.moveTo(mouseX, downY);
            g.lineTo(mouseX, upY);
            g.endStroke();
            let graphic = {
                name : this.state.graphics.length,
                x : mouseX,
                y : mouseY,
                leftX: leftX,
                rightX : rightX,
                downY : downY,
                upY:upY
            };
            let newGraphics = JSON.parse(JSON.stringify(this.state.graphics))
            newGraphics.push(graphic);
            this.setState({
                graphics : newGraphics
            });
            stage.addChild(new createjs.Shape()).set({graphics:g, x:0, y:0, name:graphic.name});
        });
        createjs.Ticker.on('tick', (e) => {
            background.alpha = 1;
            if(stage.mouseInBounds) {
                background.alpha = 1;
                const g = new createjs.Graphics();
                g.setStrokeStyle(1, 'round', 1, 0, true);
                g.setStrokeDash([2, 1], 0);
                g.beginStroke('0xFFFFFF');
                g.moveTo(0, stage.mouseY);
                g.lineTo(1000, stage.mouseY);
                g.moveTo(stage.mouseX, 0);
                g.lineTo(stage.mouseX, 400);
                g.endStroke();
                stage.removeChild(stage.getChildByName('follow'));
                stage.addChild(new createjs.Shape()).set({graphics:g, x:0, y:0, name:'follow'});
            }

            stage.update(e);
        });
    }
    componentDidUpdate() {
        const stage = new createjs.Stage('canvas');
        stage.update();
    }
    clickButton(){
        c.saveAsImage(document.getElementById('canvas'),1000,400,'jpeg');
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>재단 프로그램 예제</h2>
                </div>
                <button onClick={this.clickButton}>이미지 출력</button>
                <canvas style={style.canvas} id='canvas'/>
            </div>
    );}
}

const style = {
    canvas : {
        width : '1000',
        height : '400',
        border: '1px solid black',
        cursor :'pointer'
    }
};

export default App;
