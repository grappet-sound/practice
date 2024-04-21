import { Link } from "react-router-dom";
import "../style/Main.css";
import { HashLink } from "react-router-hash-link";
function Main() {
    return(
        <div className="body">
            <div className="topbar">
                <HashLink smooth to='/#main'>
                    <div>Main</div>
                </HashLink>
                <HashLink smooth to='/#game'>
                    <div>Games</div>
                </HashLink>
            </div>
            <div className="screen" id="main">
                Main
            </div>
            <div className="screen" id="game">
                <h3>Games</h3>
                <div className="gameContainer">
                    <Link to='/random'>
                        <button>
                            Random Game
                        </button>
                    </Link>
                    <Link to='/tictactoe'>
                        <button>
                            TicTacToe Game
                        </button>
                    </Link>
                </div>
                
            </div>
            
            
        </div>
    );
}
export default Main;