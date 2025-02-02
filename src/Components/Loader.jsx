import React from 'react';
import { BounceLoader} from 'react-spinners'; // Import ClipLoader from react-spinners

const Loader = () => {
  return (
    <div className="fixed  flex items-center justify-center z-10">
      <BounceLoader color="#6d9ede" size={80} /> {/* Customize color and size */}
    </div>
  );
};

export default Loader;
