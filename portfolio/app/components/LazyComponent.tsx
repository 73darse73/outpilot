'use client';

import { Suspense, lazy, ComponentType } from 'react';

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  fallback?: React.ReactNode;
  [key: string]: unknown;
}

export default function LazyComponent({
  component,
  fallback = (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64" />
  ),
  ...props
}: LazyComponentProps) {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
}
