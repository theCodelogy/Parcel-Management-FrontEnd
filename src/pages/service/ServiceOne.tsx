import React from "react";
import { Truck, Building, Package, GitPullRequest } from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  description,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-red-600 w-24 h-24 flex items-center justify-center rounded-xl transform rotate-45 mb-4">
        <div className="transform -rotate-45">{icon}</div>
      </div>
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      )}
      <p className="text-sm text-gray-600 text-center max-w-xs">
        {description}
      </p>
    </div>
  );
};

const ServiceOne: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left column - E-Commerce delivery */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            E-Commerce delivery
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0">
              <div className="bg-red-600 w-24 h-24 flex items-center justify-center rounded-xl transform rotate-45">
                <div className="transform -rotate-45">
                  <Truck />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 max-w-lg">
              Voluptatem et unde voluptas sit quasi dignissimos occaecati
              dolorum qui officiis eligendi impedit ex esse aut blanditiis
              deserunt accusantium itaque temporibus sed praesentium dolor
              recusandae consequatur molestias rem consequatur quos pariatur
              consequatur nihil beatae molestiae est quo odio beatae qui ipsa
              autem.
            </p>
          </div>
        </div>

        {/* Right column - Latest Services */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Latest Services
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <ServiceCard
                title="Warehousing"
                icon={<Building />}
                description="Ipsam saepe voluptatem quae libero est alias animi consequat ..."
              />
            </div>
            <div>
              <ServiceCard
                title="Packaging"
                icon={<Package />}
                description="Voluptatem est dolor a illum aspernatur culpa deleniti est d ..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div></div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <ServiceCard
              title="Pick & Drop"
              icon={<GitPullRequest />}
              description="Quod error quod quia quam alias dignissimos iure sunt ut des ..."
            />
          </div>
          <div>
            <ServiceCard
              title="E-Commerce delivery"
              icon={<Truck />}
              description="Voluptatem et unde voluptas sit quasi dignissimos occaecati ..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOne;
