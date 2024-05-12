import  PicrossCell from "../component/PicrossCell";
import "../style/Picross.css";
function Picross(){
    return (
        <div className="picrossBody">
            <h1>Picross</h1>
            <div className="container">
                <div className="row">
                    <div className="key"></div>
                    <div className="key top">1<br></br>1</div>
                    <div className="key top">2</div>
                    <div className="key top">2<br></br>1</div>
                    <div className="key top">1<br></br>2</div>
                    <div className="key top">2</div>
                </div>
                <div className="row">
                    <div className="key left">1</div>
                    <PicrossCell></PicrossCell>
                    <PicrossCell></PicrossCell>
                    <PicrossCell></PicrossCell>
                    <PicrossCell></PicrossCell>
                    <PicrossCell></PicrossCell>
                </div>
                <div className="row">
                    <div className="key left">1</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
                <div className="row">
                    <div className="key left">1</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
                <div className="row">
                    <div className="key left">1</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
                <div className="row">
                    <div className="key left">1</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
            </div>
            <div className="UI">
                <button>New Game</button>
            </div>
        </div>);
}
export default Picross;