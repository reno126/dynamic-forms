'use client';

import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { useTotalRecordCount } from '@/hooks/useTotalRecordCount';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, ListChecks } from 'lucide-react';

export default function DashboardPage() {
  const { formDefinitions } = useFormDefinitions();
  const totalRecords = useTotalRecordCount();

  const totalForms = formDefinitions?.length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Forms
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalForms}</div>
            <p className="text-xs text-muted-foreground">
              Number of form definitions created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              Total number of records submitted across all forms
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
