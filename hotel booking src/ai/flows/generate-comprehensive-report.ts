'use server';

/**
 * @fileOverview Generates a comprehensive report on Akhade tent emergency bed availability.
 *
 * - generateComprehensiveReport - A function that generates the report.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateComprehensiveReportInputSchema,
  type GenerateComprehensiveReportInput,
  GenerateComprehensiveReportOutputSchema,
  type GenerateComprehensiveReportOutput,
} from './schemas';

export async function generateComprehensiveReport(
  input: GenerateComprehensiveReportInput
): Promise<GenerateComprehensiveReportOutput> {
  return generateComprehensiveReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComprehensiveReportPrompt',
  input: {schema: GenerateComprehensiveReportInputSchema},
  output: {schema: GenerateComprehensiveReportOutputSchema},
  prompt: `You are a skilled data analyst in healthcare management. Generate a comprehensive report on Akhade tent emergency bed availability.

  Report should be structured with a title, introduction, key findings (using bullet points), and a conclusion.

  Consider the following factors in your analysis:
  - Hospital Location: {{{hospitalLocation}}}
  - Current Healthcare Demands: {{{healthcareDemands}}}
  - Ongoing Emergencies: {{{ongoingEmergencies}}}

  Use the following data to generate the report:
  - Total Beds: {{{totalBeds}}}
  - Occupied Beds: {{{occupiedBeds}}}
  - Available Beds: {{(totalBeds - occupiedBeds)}}

  Ensure the data is accurate and relevant. Avoid speculation.

  Output should be structured as a JSON object conforming to the following schema:  {
  "reportTitle": "string",
  "introduction": "string",
  "findings": ["string", "string"],  // Array of key findings as bullet points
  "conclusion": "string"}

  Ensure that the findings array contains strings which start with a bullet point. Use * as the bullet point character.
`,
});

const generateComprehensiveReportFlow = ai.defineFlow(
  {
    name: 'generateComprehensiveReportFlow',
    inputSchema: GenerateComprehensiveReportInputSchema,
    outputSchema: GenerateComprehensiveReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
