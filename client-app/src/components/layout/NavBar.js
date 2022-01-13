import { useParams } from "react-router-dom";

export default function NavBar() {
    const params = useParams();
    return (
        <div>
        <h1>NavBar </h1>
        <p>Welcome user id : {params.idUser}</p>
      </div>
    )
}