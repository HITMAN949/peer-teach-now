
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { runDatabaseSeed, checkIfDatabaseSeeded } from "@/utils/seedDatabase";
import { Loader2, Database, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminControls = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if database already has data
    const checkDatabase = async () => {
      const isSeeded = await checkIfDatabaseSeeded();
      setHasData(isSeeded);
    };
    
    checkDatabase();
  }, []);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedStatus('idle');
    
    try {
      const success = await runDatabaseSeed();
      
      if (success) {
        setSeedStatus('success');
        setHasData(true);
        toast({
          title: "Database seeded successfully",
          description: "Test data has been added to your database. You can now browse teaching offers and see dummy users.",
        });
      } else {
        setSeedStatus('idle');
        toast({
          title: "Database already contains data",
          description: "The database already has data. Go to Browse Teaching Offers to see the data.",
        });
      }
    } catch (error) {
      setSeedStatus('error');
      toast({
        title: "Error seeding database",
        description: "There was an error adding test data to the database.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <Button
        onClick={handleSeedDatabase}
        disabled={isSeeding}
        className="w-full"
        variant={seedStatus === 'success' ? 'outline' : hasData ? 'outline' : 'default'}
        size="lg"
      >
        {isSeeding ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Seeding Database...
          </>
        ) : seedStatus === 'success' ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Database Seeded - View Teacher Offers
          </>
        ) : seedStatus === 'error' ? (
          <>
            <AlertCircle className="mr-2 h-5 w-5" />
            Retry Seeding Database
          </>
        ) : hasData ? (
          <>
            <Database className="mr-2 h-5 w-5" />
            Database Already Has Test Data
          </>
        ) : (
          <>
            <Database className="mr-2 h-5 w-5" />
            Seed Database with Test Data
          </>
        )}
      </Button>
      
      {hasData && (
        <div className="mt-3 text-center">
          <a href="/offers/browse" className="text-westudy-600 dark:text-westudy-400 hover:underline">
            Browse Teaching Offers →
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
