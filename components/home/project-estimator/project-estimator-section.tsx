import { Card } from 'components/ui/card';

const ProjectEstimatorSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Project Estimator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Small Project
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Estimated cost: $1000 - $5000
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Medium Project
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Estimated cost: $5000 - $10000
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Large Project
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Estimated cost: $10000+
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectEstimatorSection;
