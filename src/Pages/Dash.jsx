import Navber from "../Components/Navber";
import Banner from "../Components/Banner";
import Topmix from "../Components/Topmix";
import RecentListen from "../Components/RecentListen";
import Related from "../Components/Related";
import Tracks from "../Components/Tracks";

const Dash = () => {
  return (
    <div className=" mb-20">
      <Navber />
      <Banner />
      <Topmix />
      <Related />
      <Tracks />
      <RecentListen />
    </div>
  );
};

export default Dash;
