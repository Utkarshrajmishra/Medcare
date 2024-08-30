import Logo from "../assets/images/logo.png";

const NavLinks = [
  {
    id: 1,
    links: "Home",
  },
  {
    id: 2,
    links: "Prediction",
  },
  {
    id: 3,
    links: "About",
  },
  {
    id: 4,
    links: "Doctor Appointment",
  },
];

const NavBar = () => {
  return (
    <nav className="py-5 ">
      <section className="flex items-center text-textColor justify-between md:px-20 px-10">
        <div>
          <img src={Logo} alt="wesbite logo" />
        </div>
        <ul className="flex items-center gap-[2.7rem] text-[0.96rem]">
          {NavLinks?.map((items, index) => (
            <li key={items.id} className="hover:text-primaryColor">
              {items.links}
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
