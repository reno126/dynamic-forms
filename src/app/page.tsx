'use client';

import React, { useMemo } from 'react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { useTotalRecordCount } from '@/hooks/useTotalRecordCount';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, ListChecks } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

interface CustomCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}

const DashboardCard = React.memo(function CustomCard({ title, value, description, icon: Icon }: CustomCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
});
DashboardCard.displayName = 'CustomCard';

export default function DashboardPage() {
  const { formDefinitions } = useFormDefinitions();
  const totalRecords = useTotalRecordCount();

  const totalForms = formDefinitions?.length ?? 0;

  const dashboardCards = useMemo(() => [
    {
      title: 'Total Forms',
      value: totalForms,
      description: 'Number of form definitions created',
      icon: FileText
    },
    {
      title: 'Total Records',
      value: totalRecords,
      description: 'Total number of records submitted across all forms',
      icon: ListChecks
    }
  ], [totalForms, totalRecords]);

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}
