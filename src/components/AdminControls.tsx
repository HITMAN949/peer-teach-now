
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { runDatabaseSeed } from "@/utils/seedDatabase";
import { Loader2, Database, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminControls = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedStatus('idle');
    
    try {
      const success = await runDatabaseSeed();
      
      if (success) {
        setSeedStatus('success');
        toast({
          title: "Database seeded successfully",
          description: "Test data has been added to your database.",
        });
      } else {
        setSeedStatus('idle');
        toast({
          title: "Database already contains data",
          description: "The database already has data. No new test data was added.",
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
    <Card className="max-w-md mx-auto my-8 border-dashed border-muted-foreground/50">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Database className="w-5 h-5" />
          Developer Tools
        </CardTitle>
        <CardDescription className="text-center">Tools for testing and development</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="w-full"
            variant={seedStatus === 'success' ? 'outline' : 'default'}
          >
            {isSeeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding Database...
              </>
            ) : seedStatus === 'success' ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Database Seeded
              </>
            ) : seedStatus === 'error' ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Retry Seeding
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Seed Database with Test Data
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            This will create test users, teaching offers, sessions, and reviews.
            <br />
            Only use this in development environments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminControls;
