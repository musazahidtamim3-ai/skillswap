import Image from "next/image";

const skills = [
  {
    title: "Web Development",
    description: "Full-stack JavaScript, React, Node.js, and deployment.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    category: "Development",
  },
  {
    title: "UI/UX Design",
    description: "Master Figma, design systems, and user research.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    category: "Design",
  },
  {
    title: "Data Science",
    description: "Python, Pandas, machine learning, and data visualization.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    category: "Data",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Docker, Kubernetes, and CI/CD pipelines.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    category: "Cloud",
  },
];

export default function FeaturedSkills() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900"
      id="featured-skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold  bg-pink-500/10 text-pink-400 mb-3">
            Featured Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Learn From{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Top Tech Skills
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-purple-800"
            >
              <div className="relative h-35 overflow-hidden">
                <Image
                  src={skill.image}
                  alt={skill.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-md">
                  {skill.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-pink-400 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        fill={
                          i < Math.round(skill.rating) ? "currentColor" : "none"
                        }
                        className={`w-4 h-4 ${i < Math.round(skill.rating)
                          ? "text-pink-500"
                          : "text-gray-600"
                          }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {skill.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}