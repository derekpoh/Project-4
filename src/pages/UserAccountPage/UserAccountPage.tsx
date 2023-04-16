import { Link, useNavigate } from "react-router-dom";

const UserAccountPage = () => {
    return(
        <>
        <Link to="/users/account/myrecipes">
       <h1>My Recipes</h1>
       </Link>
       <Link to="/users/account/createrecipe">
       <h1>Create Recipe</h1>
       </Link>
       <Link to="/users/account/bookmarks">
       <h1>Bookmarks</h1>
       </Link>
       </>
    )
}

export default UserAccountPage