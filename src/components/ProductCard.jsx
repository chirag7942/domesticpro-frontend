// import { Link } from "react-router-dom"

// export default function ProductCard({title, image, link}) {

//   return (

//     <Link to={link}>

//       <div className="card">

//         <img
//           src={image}
//           className="rounded-xl mb-4"
//         />

//         <h2 className="text-xl font-bold">
//           {title}
//         </h2>

//         <p className="text-gray-600">
//           Live-in • Live-out • Substitute
//         </p>

//       </div>

//     </Link>

//   )
// }

import { Link } from "react-router-dom"

export default function ProductCard({ image, title, points, description, link }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md 
    hover:shadow-2xl hover:-translate-y-2 
    transition-all duration-500 
    overflow-hidden h-full"> {/* Added h-full here */}

      {/* 1. Added 'md:items-stretch' to ensure both columns have equal height */}
      <div className="flex flex-col md:flex-row md:items-stretch h-full">

        {/* 2. Image Container: Changed md:h-auto to md:h-full */}
        <div className="md:w-2/5 h-64 md:h-full overflow-hidden relative">
          <img
            src={image}
            alt={title}
           
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 absolute inset-0"
          />
        </div>

        {/* Content */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-heading mb-3">
              {title}
            </h3>

            <ul className="space-y-3 mb-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <span className="text-[#EC5F36] text-lg mt-1">✔</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-sm mb-4">
              {description}
            </p>
          </div>

          <Link to={link}>
            <button className="btn-primary w-full md:w-auto">
              View More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}