import { Link} from "react-router-dom";

export function HomePage() {
    return <section>
        <nav>
            <Link to="/">Home</Link> | <Link to="/spear">Spear</Link>
        </nav>
    </section>
}
