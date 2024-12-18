"use client";

import HeroSection from 'components/home/hero-section';
import ServicesSection from 'components/home/services/services-section';
import WhyChooseSection from 'components/home/why-choose/why-choose-section';
import CaseStudiesSection from 'components/home/case-studies/case-studies-section';
import ProcessSection from 'components/home/process/process-section';
import TechnologiesSection from 'components/home/technologies/technologies-section';
import ContactSection from 'components/home/contact/contact-section';
import SpecialOffersSection from 'components/home/special-offers/special-offers-section';
import AIDemosSection from 'components/home/ai-demos/ai-demos-section';
import RecommendationsSection from 'components/home/recommendations/recommendations-section';
import AICaseStudiesSection from 'components/home/case-studies/ai-case-studies-section';
import ClientPortalSection from 'components/home/client-portal/client-portal-section';
import ProjectEstimatorSection from 'components/home/project-estimator/project-estimator-section';
import LocationContentSection from 'components/home/location-content/location-content-section';
import ContentCreationSection from 'components/home/content-creation/content-creation-section';
import VirtualToursSection from 'components/home/virtual-tours/virtual-tours-section';
import AnalyticsDashboardSection from 'components/home/analytics-dashboard/analytics-dashboard-section';
import { config } from 'lib/config';
import { useState, useEffect } from 'react';

interface FeatureToggle {
  id: string;
  label: string;
  enabled: boolean;
}

export default function Home() {
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([]);

  useEffect(() => {
    async function loadToggles() {
      try {
        const response = await fetch(`${config.apiUrl}/feature-toggles`);
        if (response.ok) {
          const toggles = await response.json();
          setFeatureToggles(toggles);
        } else {
          console.error('Failed to fetch feature toggles');
        }
      } catch (error) {
        console.error('Error loading feature toggles:', error);
      }
    }

    loadToggles();
  }, []);

  const isFeatureEnabled = (id: string) => {
    const toggle = featureToggles.find((toggle) => toggle.id === id);
    return toggle ? toggle.enabled : false;
  };

  return (
    <>
      <HeroSection />
      {isFeatureEnabled('special-offers') && <SpecialOffersSection />}
      <ServicesSection />
      <WhyChooseSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TechnologiesSection />
      <ContactSection />
      {isFeatureEnabled('ai-demos') && <AIDemosSection />}
      {isFeatureEnabled('recommendations') && <RecommendationsSection />}
      {isFeatureEnabled('ai-case-studies') && <AICaseStudiesSection />}
      {isFeatureEnabled('client-portal') && <ClientPortalSection />}
      {isFeatureEnabled('project-estimator') && <ProjectEstimatorSection />}
      {isFeatureEnabled('location-content') && <LocationContentSection />}
      {isFeatureEnabled('content-creation') && <ContentCreationSection />}
      {isFeatureEnabled('virtual-tours') && <VirtualToursSection />}
      {isFeatureEnabled('analytics-dashboard') && <AnalyticsDashboardSection />}
    </>
  );
}
