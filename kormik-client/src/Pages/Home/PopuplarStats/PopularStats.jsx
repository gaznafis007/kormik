import Card from "../../../Shared/Card/Card";
import Heading from "../../../Shared/Heading/Heading";

const PopularStats = () => {
    return (
        <section className="mx-6">
            <Heading>What we offer</Heading>
            <h2 className="text-center text-white font-thin">This platform is a junction where needs meet the right talent at the price</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 gap-4">
                <Card title={'web and IT'}>
                <span >10 sub-categories</span>
                        <br />
                        <span>100+ Jobs/projects</span>
                </Card>
                <Card title={'graphic design'}>
                <span >15 sub-categories</span>
                        <br />
                        <span>300+ Jobs/projects</span>
                </Card>
                <Card title={'consulting'}>
                <span >10 sub-categories</span>
                        <br />
                        <span>50+ Jobs/projects</span>
                </Card>
                <Card title={'digital marketing'}>
                <span >5 sub-categories</span>
                        <br />
                        <span>500+ Jobs/projects</span>
                </Card>
            </div>
        </section>
    );
};

export default PopularStats;