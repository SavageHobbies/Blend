"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from 'hooks/use-auth';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { useToast } from 'hooks/use-toast';

interface RSSFeed {
  url: string;
}

interface Service {
  name: string;
  description: string;
  setupFee: number;
  monthlyPrice: number;
  id: string;
}

interface SpecialOffer {
  title: string;
  description: string;
  link: string;
  id: string;
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [rssFeeds, setRssFeeds] = useState<RSSFeed[]>([]);
  const [newRssFeedUrl, setNewRssFeedUrl] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServiceSetupFee, setNewServiceSetupFee] = useState(0);
  const [newServiceMonthlyPrice, setNewServiceMonthlyPrice] = useState(0);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferDescription, setNewOfferDescription] = useState('');
  const [newOfferLink, setNewOfferLink] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [rssResponse, servicesResponse, offersResponse] = await Promise.all([
          fetch('/api/rss-feeds'),
          fetch('/api/services'),
          fetch('/api/special-offers'),
        ]);

        if (rssResponse.ok) {
          setRssFeeds(await rssResponse.json());
        } else {
          console.error('Failed to fetch RSS feeds');
        }

        if (servicesResponse.ok) {
          setServices(await servicesResponse.json());
        } else {
          console.error('Failed to fetch services');
        }

        if (offersResponse.ok) {
          setSpecialOffers(await offersResponse.json());
        } else {
          console.error('Failed to fetch special offers');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
      }
    }

    loadData();
  }, []);

  const handleAddRssFeed = async () => {
    try {
      const response = await fetch('/api/rss-feeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newRssFeedUrl }),
      });

      if (response.ok) {
        toast({
          title: "RSS feed added",
          description: "RSS feed added successfully",
        });
        setNewRssFeedUrl('');
        const updatedFeeds = await fetch('/api/rss-feeds').then(res => res.json());
        setRssFeeds(updatedFeeds);
      } else {
        toast({
          title: "Error adding RSS feed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding RSS feed:', error);
      toast({
        title: "Error adding RSS feed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRssFeed = async (id: number) => {
    try {
      const response = await fetch(`/api/rss-feeds?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "RSS feed deleted",
          description: "RSS feed deleted successfully",
        });
        const updatedFeeds = await fetch('/api/rss-feeds').then(res => res.json());
        setRssFeeds(updatedFeeds);
      } else {
        toast({
          title: "Error deleting RSS feed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting RSS feed:', error);
      toast({
        title: "Error deleting RSS feed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAddService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newServiceName,
          description: newServiceDescription,
          setupFee: parseFloat(newServiceSetupFee.toString()),
          monthlyPrice: parseFloat(newServiceMonthlyPrice.toString()),
        }),
      });

      if (response.ok) {
        toast({
          title: "Service added",
          description: "Service added successfully",
        });
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServiceSetupFee(0);
        setNewServiceMonthlyPrice(0);
        const updatedServices = await fetch('/api/services').then(res => res.json());
        setServices(updatedServices);
      } else {
        toast({
          title: "Error adding service",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error adding service",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleUpdateService = async (id: string, updatedService: Service) => {
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService),
      });

      if (response.ok) {
        toast({
          title: "Service updated",
          description: "Service updated successfully",
        });
        const updatedServices = await fetch('/api/services').then(res => res.json());
        setServices(updatedServices);
      } else {
        toast({
          title: "Error updating service",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error updating service",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Service deleted",
          description: "Service deleted successfully",
        });
        const updatedServices = await fetch('/api/services').then(res => res.json());
        setServices(updatedServices);
      } else {
        toast({
          title: "Error deleting service",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error deleting service",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAddSpecialOffer = async () => {
    try {
      const response = await fetch('/api/special-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newOfferTitle,
          description: newOfferDescription,
          link: newOfferLink,
        }),
      });

      if (response.ok) {
        toast({
          title: "Special offer added",
          description: "Special offer added successfully",
        });
        setNewOfferTitle('');
        setNewOfferDescription('');
        setNewOfferLink('');
        const updatedOffers = await fetch('/api/special-offers').then(res => res.json());
        setSpecialOffers(updatedOffers);
      } else {
        toast({
          title: "Error adding special offer",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding special offer:', error);
      toast({
        title: "Error adding special offer",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSpecialOffer = async (id: string, updatedOffer: SpecialOffer) => {
    try {
      const response = await fetch(`/api/special-offers?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOffer),
      });

      if (response.ok) {
        toast({
          title: "Special offer updated",
          description: "Special offer updated successfully",
        });
        const updatedOffers = await fetch('/api/special-offers').then(res => res.json());
        setSpecialOffers(updatedOffers);
      } else {
        toast({
          title: "Error updating special offer",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating special offer:', error);
      toast({
        title: "Error updating special offer",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSpecialOffer = async (id: string) => {
    try {
      const response = await fetch(`/api/special-offers?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Special offer deleted",
          description: "Special offer deleted successfully",
        });
        const updatedOffers = await fetch('/api/special-offers').then(res => res.json());
        setSpecialOffers(updatedOffers);
      } else {
        toast({
          title: "Error deleting special offer",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting special offer:', error);
      toast({
        title: "Error deleting special offer",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });

      if (response.ok) {
        toast({
          title: "Article saved",
          description: "Your article has been saved successfully",
        });
        setTitle('');
        setContent('');
        setCategory('');
      } else {
        toast({
          title: "Error saving article",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error saving article",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Article Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Article Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button type="submit">Save Article</Button>
            </form>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Manage RSS Feeds</h2>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="New RSS Feed URL"
                value={newRssFeedUrl}
                onChange={(e) => setNewRssFeedUrl(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button onClick={handleAddRssFeed}>Add Feed</Button>
            </div>
            <ul className="space-y-2">
              {rssFeeds.map((feed, index) => (
                <li key={index} className="flex justify-between items-center bg-white/5 p-2 rounded-md">
                  <span className="text-white">{feed.url}</span>
                  <Button onClick={() => handleDeleteRssFeed(index)} variant="destructive" size="sm">
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Manage Services</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Service Name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Service Description"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Setup Fee"
                  type="number"
                  value={newServiceSetupFee}
                  onChange={(e) => setNewServiceSetupFee(parseFloat(e.target.value))}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Monthly Price"
                  type="number"
                  value={newServiceMonthlyPrice}
                  onChange={(e) => setNewServiceMonthlyPrice(parseFloat(e.target.value))}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button onClick={handleAddService}>Add Service</Button>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              {services.map((service) => (
                <li key={service.id} className="bg-white/5 p-2 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">{service.name}</span>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleUpdateService(service.id, { ...service, name: prompt('Enter new name', service.name) || service.name, description: prompt('Enter new description', service.description) || service.description, setupFee: parseFloat(prompt('Enter new setup fee', service.setupFee.toString()) || service.setupFee.toString()), monthlyPrice: parseFloat(prompt('Enter new monthly price', service.monthlyPrice.toString()) || service.monthlyPrice.toString()) })} size="sm">
                        Update
                      </Button>
                      <Button onClick={() => handleDeleteService(service.id)} variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-white text-sm mt-1">{service.description}</p>
                  <p className="text-white text-sm">Setup Fee: ${service.setupFee}</p>
                  <p className="text-white text-sm">Monthly Price: ${service.monthlyPrice}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Manage Special Offers</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Offer Title"
                  value={newOfferTitle}
                  onChange={(e) => setNewOfferTitle(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Offer Description"
                  value={newOfferDescription}
                  onChange={(e) => setNewOfferDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Offer Link"
                  value={newOfferLink}
                  onChange={(e) => setNewOfferLink(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button onClick={handleAddSpecialOffer}>Add Offer</Button>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              {specialOffers.map((offer) => (
                <li key={offer.id} className="bg-white/5 p-2 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">{offer.title}</span>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleUpdateSpecialOffer(offer.id, { ...offer, title: prompt('Enter new title', offer.title) || offer.title, description: prompt('Enter new description', offer.description) || offer.description, link: prompt('Enter new link', offer.link) || offer.link })} size="sm">
                        Update
                      </Button>
                      <Button onClick={() => handleDeleteSpecialOffer(offer.id)} variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-white text-sm mt-1">{offer.description}</p>
                  <a href={offer.link} className="text-white text-sm underline" target="_blank" rel="noopener noreferrer">
                    {offer.link}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
