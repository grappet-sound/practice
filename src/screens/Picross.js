import  PicrossCell from "../component/PicrossCell";
import "../style/Picross.css";
import {useEffect, useState} from "react";
import MAP_HEART from "../script/PicrossMap";
function Picross(){
    const [hint, setHint] = useState({row: [], col: []});
    const [map, setMap] = useState([]);
    const [userMap, setUserMap] = useState([]);
    const [dragStartPoint, setDSP] = useState({isDragging: false});
    const [currPoint, setCP] = useState({row: -1, col: -1});
    function mapSetting(){
        setMap(MAP_HEART);
    }
    useEffect(mapSetting, []);

    function userMapSetting(){
        if(map.length == 0) return;
        var width = map[0].length;
        var height = map.length;
        var newUserMap = [];
        for(var i = 0; i < height; i++){
            var row = [];
            for(var j = 0; j < width; j++){
                row.push(0);
            }
            newUserMap.push(row);
        }
        setUserMap(newUserMap);
    }
    useEffect(userMapSetting, [map]);
    function hintSetting(){
        var width = map[0].length;
        var height = map.length;
        var rowHintMap = [];
        var colHintMap = [];

        for(var i = 0; i < height; i++){
            var rowHint = [];
            var count = 0;
            for(var j = 0; j < width; j++){
                if(map[i][j] == 1){
                    count++;
                }else{
                    if(count > 0){
                        rowHint.push(count);
                        count = 0;
                    }
                }
            }
            if(count > 0){
                rowHint.push(count);
            }
            rowHintMap.push(rowHint);
        }
        for(var i = 0; i < width; i++){
            var colHint = [];
            var count = 0;
            for(var j = 0; j < height; j++){
                if(map[j][i] == 1){
                    count++;
                }else{
                    if(count > 0){
                        colHint.push(count);
                        count = 0;
                    }
                }
            }
            if(count > 0){
                colHint.push(count);
            }
            colHintMap.push(colHint);
        }
        console.log(rowHintMap);
        console.log(colHintMap);
        setHint({row: rowHintMap, col: colHintMap});
    }
    function getCellType(state, rowIdx, colIdx){
        if(state == 1) return "colored";
        if(state == 2) return "marked";
        if(state == 3) return "wrong";
        if(state == 4) return "drag";

        if(dragStartPoint.isDragging){
            if(dragStartPoint.row == currPoint.row){
                if(rowIdx == dragStartPoint.row){
                    if((dragStartPoint.col <= colIdx && colIdx <= currPoint.col) || (currPoint.col <= colIdx && colIdx <= dragStartPoint.col)){
                        return "drag";
                    }
                }
            }
            if(dragStartPoint.col == currPoint.col){
                if(colIdx == dragStartPoint.col){
                    if((dragStartPoint.row <= rowIdx && rowIdx <= currPoint.row) || (currPoint.row <= rowIdx && rowIdx <= dragStartPoint.row)){
                        return "drag";
                    }
                }
            }
        }

        
        return "";
    }

    function updateUserMap(rowIdx, colIdx, state){
        var newUserMap = userMap.map(row => [...row]);
        newUserMap[rowIdx][colIdx] = state;
        setUserMap(newUserMap);
    }

    function dragStart(rowIdx, colIdx){
        setDSP({
            isDragging: true,
            row: rowIdx,
            col: colIdx,
            isRightClick: false
        });
    }

    function rightClickDragStart(rowIdx, colIdx){
        setDSP({
            isDragging: true,
            row: rowIdx,
            col: colIdx,
            isRightClick: true,
            isErasing: userMap[rowIdx][colIdx] == 2
        });
    }

    
    function fillCell(rowIdx, colIdx, fillNumber){
        if(userMap[rowIdx][colIdx] == 2 && fillNumber == 0){
            return 0;
        }
        if(userMap[rowIdx][colIdx] != 0){
            return userMap[rowIdx][colIdx];
        }
        if(fillNumber == 1){
            if(map[rowIdx][colIdx] == 1){
                return 1;
            }else{
                return 3;
            }
        }
        return fillNumber;
    }

    function dragEnd(){
        if(dragStartPoint.isDragging){
            var newUserMap = userMap.map(row => [...row]);
            var fillNumber = 1;
            
            if(dragStartPoint.isRightClick){
                if(dragStartPoint.isErasing){
                    fillNumber = 0;
                }else{
                    fillNumber = 2;
                }
            }

            if(dragStartPoint.row == currPoint.row){
                for(var colIdx = 0; colIdx < userMap[0].length; colIdx++){
                    if((dragStartPoint.col <= colIdx && colIdx <= currPoint.col) || (currPoint.col <= colIdx && colIdx <= dragStartPoint.col)){
                        newUserMap[dragStartPoint.row][colIdx] = fillCell(dragStartPoint.row, colIdx, fillNumber);
                    }
                }
            }
            if(dragStartPoint.col == currPoint.col){
                for(var rowIdx = 0; rowIdx < userMap.length; rowIdx++){
                    if((dragStartPoint.row <= rowIdx && rowIdx <= currPoint.row) || (currPoint.row <= rowIdx && rowIdx <= dragStartPoint.row)){
                        newUserMap[rowIdx][dragStartPoint.col] = fillCell(rowIdx, dragStartPoint.col, fillNumber);
                    }
                }
            }
            setUserMap(newUserMap);
        }
        setDSP({isDragging: false});
    }

    return (
        <div className="picrossBody" onMouseUp={dragEnd}>
            <h1>Picross</h1>
            <div className="container">
                <div className="row">
                    <div className="key"></div>
                    {hint.col.map((colHint) => <div className="key top">
                        {colHint.map((num) => {
                            return (<>
                            {num}
                            <br></br>
                            </>);
                        })}
                    </div>)}
                </div>
                {hint.row.map((rowHint, rowIdx) => 
                    <div className="row">
                        <div className="key left">
                            {rowHint.map(num => <>{num} </>)}
                        </div>
                        {userMap[rowIdx].map((state, colIdx) => {
                            return (
                                <div
                                    className="wrap" 
                                    onMouseDown={(e)=>{
                                        if((e.button == 0) || (e.which && e.which == 1)){
                                            dragStart(rowIdx, colIdx);
                                        }else if((e.button && e.button == 2) || (e.which && e.which == 3)){
                                            rightClickDragStart(rowIdx, colIdx);
                                        }
                                    }}
                                    onMouseEnter={() => {setCP({row: rowIdx, col: colIdx})}}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <PicrossCell cellType={getCellType(state, rowIdx, colIdx)}></PicrossCell>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className="UI">
                <button onClick={hintSetting}>New Game</button>
            </div>
        </div>);
}
export default Picross;