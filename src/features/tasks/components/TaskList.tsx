'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, ChevronLeft, ChevronRight, ListTodo } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks/useTasks';
import { TaskStatus, TaskPriority } from '../types';
import { cn } from '@/src/lib/utils/utils';

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'ALL'>('ALL');

  const { tasks, pagination, isLoading, error, updateParams, params } = useTasks({
    page: 1,
    limit: 10,
  });

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchQuery || undefined, page: 1 });
  };

  // Handle filter changes
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value as TaskStatus | 'ALL');
    updateParams({
      status: value === 'ALL' ? undefined : (value as TaskStatus),
      page: 1,
    });
  };

  const handlePriorityFilter = (value: string) => {
    setPriorityFilter(value as TaskPriority | 'ALL');
    updateParams({
      priority: value === 'ALL' ? undefined : (value as TaskPriority),
      page: 1,
    });
  };

  // Handle pagination
  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      updateParams({ page: (pagination.currentPage || 1) - 1 });
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      updateParams({ page: (pagination.currentPage || 1) + 1 });
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (pagination?.totalPages || 1)) {
      updateParams({ page });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];
    
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={handlePriorityFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900 font-medium">Error loading tasks</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && tasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-heading font-bold text-xl text-rich-black mb-2">
            No Tasks Found
          </h3>
          <p className="text-rich-black/70">
            {searchQuery || statusFilter !== 'ALL' || priorityFilter !== 'ALL'
              ? 'Try adjusting your filters'
              : 'Create your first task to get started'}
          </p>
        </div>
      )}

      {/* Task List */}
      {!isLoading && !error && tasks.length > 0 && (
        <>
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
              {/* Pagination Info */}
              <div className="text-sm text-rich-black/60">
                Showing{' '}
                <span className="font-medium text-rich-black">
                  {((pagination.currentPage - 1) * pagination.limit) + 1}
                </span>
                {' - '}
                <span className="font-medium text-rich-black">
                  {Math.min(pagination.currentPage * pagination.limit, pagination.totalDocs)}
                </span>
                {' of '}
                <span className="font-medium text-rich-black">
                  {pagination.totalDocs}
                </span>
                {' tasks'}
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrevPage}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-rich-black/40"
                        >
                          ...
                        </span>
                      );
                    }
                    
                    const pageNum = page as number;
                    const isActive = pageNum === pagination.currentPage;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={isActive ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                          'min-w-[40px]',
                          isActive && 'bg-tomato hover:bg-tomato-600 text-white'
                        )}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

