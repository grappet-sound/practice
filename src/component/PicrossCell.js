function PicrossCell(cellType){
    function getClassName(){
        if(cellType == "colored") {
            return "cell colored";
        }
        if(cellType == "wrong") {
            return "cell wrong";
        }
        if(cellType == "marked") {
            return "cell marked";
        }
    }
    return <div className="cell"></div>;
}
export default PicrossCell;