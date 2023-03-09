import notfound from "../assets/notfound.png"

const NotFoundPage = () => (
    <div className="container not-found">
        <h1>404:</h1>
        <p>Page not found!</p>
        <img src={notfound} alt="404:not found" />
        <p className="caption">Hiroshi Nagai inspired "not found" page picture - Dream/Wombo</p>
    </div>
)

export default NotFoundPage