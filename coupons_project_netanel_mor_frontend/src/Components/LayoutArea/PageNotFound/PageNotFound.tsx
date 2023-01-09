import "./PageNotFound.css";
import notFoundImage from "./404-Page-Not-Found.png";
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img src={notFoundImage} alt="404" />
            
        </div>
    );
}

export default PageNotFound;
