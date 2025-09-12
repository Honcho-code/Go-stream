import { signOut, updateProfile } from "firebase/auth";
import React, {  useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";


const Profile = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(auth?.currentUser.displayName);
  const [email, setEmail] = useState(auth?.currentUser.email);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateProfile = async(e)=>{
    e.preventDefault();
    try {
        await updateProfile(auth.currentUser,{
            displayName: username,
            email: email
        });
        setShowModal(false);
        toast.success("Profile updated successfully");
    } catch (error) {
        console.error("Error updating profile", error);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "watchlist"),
      (snapshot) => {
        setWatchlist(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

        
  return (
    <div className="my-6 md:my-8 mx-4 md:mx-10 min-h-[80vh]">
      <div
        className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center p-4 bg-zinc-800 rounded-md shadow-md
        "
      >
        <div className="mb-4 md:mb-0 flex flex-col gap-2">
          <h1 className="headline-2">{auth?.currentUser.displayName}</h1>
          <p className="text-lg text-zinc-500">{auth?.currentUser.email}</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-800 rounded-md cursor-pointer" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md ml-4 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="my-10">
        <h1 className="headline-2 my-4">Your Watchlist</h1>
        {loading ? (
          <p>Loading...</p>
        ) : watchlist.length === 0 ? (
          <p className="text-zinc-500">Your watchlist is empty.</p>
        ) : (<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-5">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="rounded cursor-pointer group relative overflow-hidden shadow-lg" onClick={()=>navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="rounded-2xl w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Hidden Info */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white 
                        opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 
                        transition-all duration-500"
              >
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <div className="flex gap-2 items-center text-yellow-400">
                  <FontAwesomeIcon icon={faStar} />
                  <p className="font-bold">{movie.vote_average}</p>
                </div>
                <button className="w-full py-1 rounded-xl bg-blue-800 mt-3 cursor-pointer">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
    )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border bg-zinc-800 text-white px-3 py-2 rounded-lg outline-blue-800"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border bg-zinc-800 text-white px-3 py-2 rounded-lg outline-blue-800"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
