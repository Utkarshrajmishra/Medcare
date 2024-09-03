import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const NavLinks = [
  {
    id: 1,
    links: "Home",
    path: "/",
  },
  {
    id: 2,
    links: "Prediction",
    path: "/sympton",
  },
  {
    id: 3,
    links: "Audio Analysis",
  },
  {
    id: 4,
    links: "Doctor Appointment",
  },
];

const NavBar = () => {
  return (
    <nav className="py-5 shadow-sm ">
      <section className="flex items-center text-textColor justify-between md:px-20 px-10">
        <div>
          <img src={Logo} alt="wesbite logo" />
        </div>
        <ul className="flex items-center gap-[2.7rem] text-[0.96rem]">
          {NavLinks?.map((items, index) => (
            <li key={items.id} className="hover:text-primaryColor">
              <Link to={items.path}>{items.links}</Link>
            </li>
          ))}
        </ul>
        <button className="bg-primaryColor px-5 text-[0.9rem] text-white py-2 rounded-3xl">
          Login
        </button>
      </section>
    </nav>
  );
};

export default NavBar;
