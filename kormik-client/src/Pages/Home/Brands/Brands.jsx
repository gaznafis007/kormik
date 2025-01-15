import { motion } from 'framer-motion';

const brandLogos = [
  { name: 'Apple', url: 'https://www.tailorbrands.com/wp-content/uploads/2021/01/apple_logo_1988.jpg' },
  { name: 'Google', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Microsoft', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Amazon', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Facebook', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png' },
  { name: 'Tesla', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Netflix', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Uber', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Airbnb', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Spotify', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Twitter', url: '/placeholder.svg?height=80&width=80' },
  { name: 'Adobe', url: '/placeholder.svg?height=80&width=80' },
];

const Brands = () => {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold text-center mb-4 text-white">
            Our Popular <span className="text-rose-500">Clients</span>
          </h2>
          <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto text-lg">
            Empowering innovation across industries, we are proud to collaborate with these tech giants.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-rose-500 rounded-full blur-3xl opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 relative">
            {brandLogos.map((brand, index) => (
              <motion.div
                key={brand.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-rose-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center p-6 bg-slate-600 bg-opacity-50 backdrop-blur-md rounded-xl overflow-hidden">
                <span className="text-rose-300 font-semibold text-lg">{brand.name}</span>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-slate-800 bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    <span className="text-rose-500 font-semibold text-lg">{brand.name}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

