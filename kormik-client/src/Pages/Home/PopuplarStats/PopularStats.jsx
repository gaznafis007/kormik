import { CodeBracketIcon, PaintBrushIcon, LightBulbIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const PopularStats = () => {
    const categories = [
        { title: 'Web and IT', icon: CodeBracketIcon, subCategories: 10, jobs: 100 },
        { title: 'Graphic Design', icon: PaintBrushIcon, subCategories: 15, jobs: 300 },
        { title: 'Consulting', icon: LightBulbIcon, subCategories: 10, jobs: 50 },
        { title: 'Digital Marketing', icon: MegaphoneIcon, subCategories: 5, jobs: 500 },
    ];

    return (
        <section className="py-16 px-4 bg-slate-700 text-white mx-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">What we offer</h2>
                <p className="text-center text-slate-300 mb-12">Find the right talent at the right price</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-slate-600 rounded-lg p-6 transition-all duration-300 hover:bg-slate-500 hover:shadow-lg hover:shadow-rose-500/20">
                            <category.icon className="h-12 w-12 mb-4 mx-auto text-rose-400" />
                            <h3 className="text-xl font-semibold text-center mb-3">{category.title}</h3>
                            <div className="text-center text-sm space-y-1">
                                <p className="text-slate-300">{category.subCategories} sub-categories</p>
                                <p className="font-medium text-rose-300">{category.jobs}+ Jobs/projects</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularStats;

