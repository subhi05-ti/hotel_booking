/**
 * @fileOverview Schemas and types for AI flows.
 */

import {z} from 'genkit';

export const GenerateComprehensiveReportInputSchema = z.object({
  totalBeds: z.number().describe('The total number of Akhade tent emergency beds.'),
  occupiedBeds: z.number().describe('The number of beds currently occupied.'),
  hospitalLocation: z.string().describe('The location of the hospital.'),
  healthcareDemands: z.string().describe('The current healthcare demands.'),
  ongoingEmergencies: z.string().describe('Any ongoing emergencies that may affect bed availability.'),
});
export type GenerateComprehensiveReportInput = z.infer<typeof GenerateComprehensiveReportInputSchema>;

export const GenerateComprehensiveReportOutputSchema = z.object({
  reportTitle: z.string().describe('The title of the report.'),
  introduction: z.string().describe('The introduction to the report.'),
  findings: z.array(z.string()).describe('Key findings presented as bullet points.'),
  conclusion: z.string().describe('A summary of the implications of the bed availability.'),
});
export type GenerateComprehensiveReportOutput = z.infer<typeof GenerateComprehensiveReportOutputSchema>;
