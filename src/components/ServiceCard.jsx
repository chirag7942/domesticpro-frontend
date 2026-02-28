import Link from "next/link";

export default function ServiceCard({ title, desc, image, link }) {
  return (
    <Link href={link}>
      <div className="card overflow-hidden group cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* Image */}
        <div className="overflow-hidden rounded-xl mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="text-center px-4 pb-4">
          <h3 className="text-xl font-bold mb-2 text-textDark">
            {title}
          </h3>

          <p className="text-textLight text-sm">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
