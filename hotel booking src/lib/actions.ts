'use server';

import { z } from 'zod';
import { generateComprehensiveReport } from '@/ai/flows/generate-comprehensive-report';
import {
  GenerateComprehensiveReportInputSchema,
  type GenerateComprehensiveReportOutput,
} from '@/ai/flows/schemas';


export interface AnalyzerState {
  report?: GenerateComprehensiveReportOutput;
  coordinates?: { lat: number, lng: number };
  locationName?: string;
  error?: string;
}

async function getCoordinates(location: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_MAPS_API_KEY environment variable is not set.");
    // Return a structured error that can be handled by the client
    throw new Error("Server configuration error: Missing Google Maps API key.");
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      console.warn(`Geocoding failed for location "${location}": ${data.status} - ${data.error_message || 'No results'}`);
      return null;
    }
  } catch (error) {
    console.error(`Geocoding fetch failed for location "${location}":`, error);
    return null;
  }
}

// We extend the schema for client-side validation, as form values can be strings
const FormSchema = GenerateComprehensiveReportInputSchema.extend({
  totalBeds: z.coerce.number().min(0, "Total beds must be a positive number."),
  occupiedBeds: z.coerce.number().min(0, "Occupied beds must be a positive number."),
  hospitalLocation: z.string().min(3, "Hospital location is required."),
  healthcareDemands: z.string().min(1, "Healthcare demands are required."),
  ongoingEmergencies: z.string().min(1, "Ongoing emergencies are required."),
}).refine(data => data.occupiedBeds <= data.totalBeds, {
  message: "Occupied beds cannot be greater than total beds.",
  path: ["occupiedBeds"],
});


export async function generateReportAction(
  prevState: AnalyzerState,
  formData: FormData
): Promise<AnalyzerState> {
  
  const rawData = {
    totalBeds: formData.get('totalBeds'),
    occupiedBeds: formData.get('occupiedBeds'),
    hospitalLocation: formData.get('hospitalLocation'),
    healthcareDemands: formData.get('healthcareDemands'),
    ongoingEmergencies: formData.get('ongoingEmergencies'),
  };

  const validationResult = FormSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map(e => e.message).join(' ');
    return { error: `Invalid input: ${errorMessages}` };
  }

  const inputData = validationResult.data;

  try {
    const [report, coordinates] = await Promise.all([
      generateComprehensiveReport(inputData),
      getCoordinates(inputData.hospitalLocation)
    ]);

    if (!report) {
      return { error: 'Failed to generate report from AI service.' };
    }

    return {
      report,
      coordinates: coordinates ?? undefined,
      locationName: inputData.hospitalLocation,
    };

  } catch (e: any) {
    console.error("generateReportAction failed:", e);
    return { error: e.message || 'An unexpected error occurred while generating the report.' };
  }
}
