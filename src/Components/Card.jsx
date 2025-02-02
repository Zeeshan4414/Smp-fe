import React from 'react';
// import './Card.css';

// const Card = ({ title, description, image }) => {
//     return (
//         <div className="card">
//             <img src={image} alt={title} className="card-img" />
//             <div className="card-content">
//                 <h3 className="card-title">{title}</h3>
//                 <p className="card-description">{description}</p>
//             </div>
//         </div>
//     );
// };

// export default Card;

const Card = ({ title, description, image }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-500 mb-4">{title}</h3>
                <p className="text-gray-600 text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;
