'use client';

import { useEffect, useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard } from '@/src/features/services/components/ServiceCard';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import { ApiService } from '@/src/features/services/types/api';
import { ApiCategory } from '@/src/features/categories/types/api';
import { apiServiceRepository, ServiceSearchResult } from '@/src/features/services/lib/ApiServiceRepository';
import { apiCategoryRepository } from '@/src/features/categories/lib/ApiCategoryRepository';
import { PaginationInfo } from '@/src/shared/types';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, LayoutGrid, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ITEMS_PER_PAGE = 9;

export default function ServicesPage() {
  // Services state
  const [services, setServices] = useState<ApiService[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Categories state
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Loading states
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const allCategories = await apiCategoryRepository.getAllCategories();
        setCategories(allCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch services when page or category changes
  const fetchServices = useCallback(async () => {
    try {
      setIsLoadingServices(true);
      setError(null);

      const result: ServiceSearchResult = await apiServiceRepository.searchServices({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        categoryId: selectedCategory || undefined,
      });

      setServices(result.services);
      setPagination(result.pagination);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setIsLoadingServices(false);
    }
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Handle category selection
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of services section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (!pagination) return [];
    
    const pages: (number | 'ellipsis')[] = [];
    const totalPages = pagination.totalPages;
    const current = pagination.currentPage;
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    pages.push(1);
    
    if (current > 3) {
      pages.push('ellipsis');
    }
    
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      pages.push(i);
    }
    
    if (current < totalPages - 2) {
      pages.push('ellipsis');
    }
    
    pages.push(totalPages);
    
    return pages;
  };

  const selectedCategoryName = selectedCategory
    ? categories.find(c => c.id === selectedCategory)?.name
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/30 pt-24 pb-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container relative mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Professional Virtual Assistance
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tighter">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-2 leading-relaxed">
              Discover our comprehensive range of virtual assistant services designed to help you reclaim your time and scale your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-white border-b border-gray-100 sticky md:top-16 z-40 shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-5">
          {/* Filter Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-semibold">Browse by Category</span>
            </div>
            {pagination && (
              <span className="text-sm text-gray-400">
                {pagination.totalDocs} services available
              </span>
            )}
          </div>
          
          {/* Category Pills - Wrapping */}
          {isLoadingCategories ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span className="text-sm text-gray-500">Loading categories...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Services
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
          
          {/* Active filter indicator */}
          <AnimatePresence>
            {selectedCategoryName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100"
              >
                <span className="text-sm text-gray-500">Filtered by:</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
                  {selectedCategoryName}
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className="hover:bg-orange-100 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Services Grid */}
      <DotBackground className="bg-white">
        <section className="container mx-auto px-6 lg:px-8 py-16">
          {/* Results Summary */}
          {pagination && !isLoadingServices && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-8"
            >
              <p className="text-gray-500">
                Showing <span className="font-semibold text-gray-900">{services.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{pagination.totalDocs}</span> services
                {selectedCategoryName && (
                  <span className="text-orange-600"> in {selectedCategoryName}</span>
                )}
              </p>
            </motion.div>
          )}

          {/* Loading state */}
          {isLoadingServices ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-100 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="mt-6 text-gray-500 font-medium">Loading services...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 mb-4 font-medium">{error}</p>
              <Button onClick={fetchServices} variant="outline" className="rounded-xl">
                Try Again
              </Button>
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <LayoutGrid className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4 font-medium">No services found in this category.</p>
              <Button onClick={() => handleCategoryChange(null)} variant="outline" className="rounded-xl">
                View All Services
              </Button>
            </div>
          ) : (
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-16"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage || isLoadingServices}
                className="flex items-center gap-1.5 rounded-xl px-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1.5 mx-4">
                {getPageNumbers().map((page, index) =>
                  page === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      •••
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoadingServices}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage || isLoadingServices}
                className="flex items-center gap-1.5 rounded-xl px-4"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </section>
      </DotBackground>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-12 md:p-16"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            
            <div className="relative text-center text-white">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Subscribe?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Choose a plan that fits your needs and start delegating tasks to our expert virtual assistants today.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Subscribe Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Import ArrowRight for CTA
import { ArrowRight } from 'lucide-react';
