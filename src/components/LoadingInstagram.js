import { useEffect, useContext } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import { auth, db } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { Context } from "../Context/GlobalState";

const LoadingInstagram = () => {
  const history = useHistory();

  const { setIsPageLoading, setUser } = useContext(Context);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Get the user document from the firestore corresponding to logged
      // in user's uid
      if (user !== null) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            const currentUser = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))[0];

            // Disable page loading and set user to globalstate
            setIsPageLoading(false);
            setUser(currentUser);

            // Check if user has fullName and username
            // If he/she has then redirect to home page
            // else he/she will remain on set-profile page
            if (
              currentUser &&
              currentUser.fullName.length > 0 &&
              currentUser.username.length > 0
            ) {
              // set the user to global state

              // Redirect to home page
              history.push("/home");
            } else {
              // Redirect to set-profile page
              history.push("/set-profile");
            }
          });
      } else {
        // Redirect to login page
        history.push("/");

        // If the user is null, stop the loading
        setIsPageLoading(false);
      }
    });

    return () => unsubscribe();
  }, [history, setIsPageLoading, setUser]);

  return (
    <div className="instagram__pageLoading">
      <InstagramIcon style={{ transform: "scale(2.5)", color: "gray" }} />
    </div>
  );
};

export default LoadingInstagram;
