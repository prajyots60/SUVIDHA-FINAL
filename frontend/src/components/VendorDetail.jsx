import { useEffect, useState } from "react";
import { getVendorById } from "../api";
import { useParams, Link } from "react-router-dom";

const VendorDetail = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      const response = await getVendorById(id);
      setVendor(response.data);
    };
    fetchVendor();
  }, [id]);

  if (!vendor) return <p>Loading...</p>;

  return (
    <div>
      <h2>{vendor.name}</h2>
      <p>{vendor.address}</p>
      <p>{vendor.occupation}</p>
      <p>{vendor.email}</p>
      <p>{vendor.description}</p> {/* Add this line to display description */}
      <img src={vendor.image} alt={vendor.name} />
      <h3>Gallery</h3>
      <div>
        {vendor.gallery.map((image, index) => (
          <img key={index} src={image} alt={`Gallery ${index}`} />
        ))}
      </div>
      <Link to={`/edit-vendor/${vendor._id}`}>Edit Vendor</Link>
    </div>
  );
};

export default VendorDetail;
