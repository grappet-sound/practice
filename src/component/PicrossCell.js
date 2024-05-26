function PicrossCell({cellType}){
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
        if(cellType == "drag") {
            return "cell drag";
        }
        return "cell";
    }
    console.log(cellType);
    return <div className={getClassName()}></div>;
}
export default PicrossCell;