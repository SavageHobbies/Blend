"use client";

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { config } from '../../lib/config';
import { useState, useEffect } from 'react';

interface Service {
  name: string;
  description: string;
  setupFee: number;
  monthlyPrice: number;
  id: string;
}

export default function ServicesListSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(`${config.apiUrl}/services`);
        if (response.ok) {
          const services = await response.json();
          setServices(services);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive range of AI and automation services
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`loading-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Loading...</h3>
                    <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      Loading...
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 flex-grow">
                      Loading...
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      {service.description}
                    </div>
                    <div className="text-lg font-semibold text-secondary mb-3">
                      Setup Fee: ${service.setupFee}
                    </div>
                    <div className="text-lg font-semibold text-secondary mb-3">
                      Monthly Price: ${service.monthlyPrice}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 flex-grow">
                    Contact for Quote
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
