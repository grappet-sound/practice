import { Link } from "react-router-dom";
function Main() {
    return(
        <div>
            <Link to='/random'>
                <button>
                    Random Game
                </button>
            </Link>
        </div>
    );
}
export default Main;