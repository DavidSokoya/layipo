'use server';
/**
 * @fileOverview An AI agent for generating personalized style tips.
 *
 * - getStyleTips - A function that generates style tips based on an event and personal style.
 * - StyleTipsInput - The input type for the getStyleTips function.
 * - StyleTipsOutput - The return type for the getStyleTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleTipsInputSchema = z.object({
  eventTitle: z.string().describe('The title of the event.'),
  dressCodeTitle: z.string().describe('The title of the dress code for the event.'),
  dressCodeDetails: z.array(z.string()).describe('A list of details about the dress code.'),
  personalStyle: z.string().describe("The user's personal style preference."),
});
export type StyleTipsInput = z.infer<typeof StyleTipsInputSchema>;

const StyleTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized style tips.'),
});
export type StyleTipsOutput = z.infer<typeof StyleTipsOutputSchema>;

export async function getStyleTips(input: StyleTipsInput): Promise<StyleTipsOutput> {
  return styleTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleTipsPrompt',
  input: {schema: StyleTipsInputSchema},
  output: {schema: StyleTipsOutputSchema},
  prompt: `You are a friendly and encouraging fashion stylist.
A user is attending an event and needs help picking an outfit.
Provide 2-3 personalized, creative, and actionable style tips based on the event's dress code and their personal style.
Keep the tips concise and easy to understand.

Event: {{{eventTitle}}}
Dress Code: {{{dressCodeTitle}}}
Dress Code Details:
{{#each dressCodeDetails}}
- {{{this}}}
{{/each}}

User's Personal Style: {{{personalStyle}}}
`,
});

const styleTipsFlow = ai.defineFlow(
  {
    name: 'styleTipsFlow',
    inputSchema: StyleTipsInputSchema,
    outputSchema: StyleTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
