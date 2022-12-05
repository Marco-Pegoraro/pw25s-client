import image404 from "../../assets/image-404.png";

export function NotFoundPage() {

    return(
        <div className="container">
            <img className="col-6 mx-auto d-flex" src={image404} alt="Not Found"/>
        </div>
    )
}