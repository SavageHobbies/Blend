"use client";

import { motion } from 'framer-motion';
import { Card } from 'components/ui/card.tsx';
import { Button } from 'components/ui/button.tsx';
import { config } from 'lib/config.ts';
import { useState, useEffect } from 'react';

interface SpecialOffer {
  title: string;
  description: string;
  link: string;
  id: string;
}

export default function SpecialOffersSection() {
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const response = await fetch(`${config.apiUrl}/special-offers`);
        if (response.ok) {
          const offers = await response.json();
          setSpecialOffers(offers);
        } else {
          console.error('Failed to fetch special offers');
        }
      } catch (error) {
        console.error('Error loading special offers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
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
            Special Offers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Check out our latest special offers and promotions
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={'loading-' + index}
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
            specialOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
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
                    <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 flex-grow">
                      {offer.description}
                    </p>
                    <div className="mt-4">
                      <a href={offer.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary">
                          Learn More
                        </Button>
                      </a>
                    </div>
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
