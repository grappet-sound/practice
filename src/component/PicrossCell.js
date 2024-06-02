function PicrossCell({cellType, cellSize}){
    function getClassName(){
        var result = "cell";
        
        result += " ";
        result += cellType;

        result += " ";
        result += "cell" + cellSize;

        return result;
    }


    return <div className={getClassName()}></div>;
}
export default PicrossCell;