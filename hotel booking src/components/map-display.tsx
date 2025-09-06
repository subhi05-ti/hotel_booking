"use client";

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, AlertTriangle } from 'lucide-react';

interface MapDisplayProps {
  coordinates: { lat: number; lng: number };
  locationName: string;
}

export default function MapDisplay({ coordinates, locationName }: MapDisplayProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Map Configuration Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            The Google Maps API key is not configured. Please set the <code className="rounded bg-destructive/20 px-1 py-0.5 font-mono text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable to display the map.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Hospital Location
        </CardTitle>
        <CardDescription>{locationName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video h-[350px] w-full overflow-hidden rounded-md">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={coordinates}
                    defaultZoom={14}
                    mapId="tentbed-analyzer-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    <AdvancedMarker position={coordinates} title={locationName} />
                </Map>
            </APIProvider>
        </div>
      </CardContent>
    </Card>
  );
}
