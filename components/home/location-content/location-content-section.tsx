import { Card } from 'components/ui/card';

const LocationContentSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              New York
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              123 Main Street, New York, NY 10001
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Los Angeles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              456 Oak Avenue, Los Angeles, CA 90001
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Chicago
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              789 Pine Lane, Chicago, IL 60601
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationContentSection;
