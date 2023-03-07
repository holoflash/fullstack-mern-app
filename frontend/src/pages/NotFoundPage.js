import notfound from "../assets/notfound.jpg"

const NotFoundPage = () => (
    <div className="container not-found">
        <h1>404:</h1>
        <p>Page not found!</p>
        <img src={notfound} alt="404:not found image" />
        <caption>Hiroshi Nagai inspired "not found" page picture - Dream/Wombo</caption>
    </div>
)

export default NotFoundPage