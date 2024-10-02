

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-200 text-center">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-purple-600">Suvidha</h2>
        <div className="flex justify-center mt-4 space-x-8">
          <div>
            <h3 className="font-semibold">COMPANY</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Career</li>
              <li>Blog</li>
              <li>Rental Guides</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">SUPPORT</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Terms and Conditions</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">EXPLORE</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Advertise with Us</li>
              <li>List Property</li>
              <li>Landlord Resources</li>
              <li>Become an Agent</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-gray-500">© 2024 Suvidha. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
