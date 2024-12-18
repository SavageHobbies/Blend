"use client";

import { motion } from 'framer-motion';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';

export default function ClientPortalSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Client Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Access your project progress, reports, and communication tools
          </motion.p>
        </div>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <span className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Client Portal</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Access your project details here
                </p>
                <Button className="mt-4">
                  Go to Portal
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
