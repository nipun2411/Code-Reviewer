import { generateReview } from './geminiService.js';

export const analyzeCode = async (codeContent, fileName) => {
  const prompt = `You are an expert code reviewer. Review this code file (${fileName}) for readability, modularity, and potential bugs, then provide improvement suggestions.

Code:
\`\`\`
${codeContent}
\`\`\`

Provide a quick code review in this EXACT format:
 Don't add code formating, headings, or extra text.
Issues Found
- [Issue 1]
- [Issue 2]
- [Issue 3]

Quick Fixes
- [Fix 1]
- [Fix 2]
- [Fix 3]

 Security Risks
- [Risk 1 if any]
- [Risk 2 if any]

 Improvements
- [Improvement 1]
- [Improvement 2]
- [Improvement 3]

 Performance
- [Tip 1]
- [Tip 2]

Rules:
- Each point must be ONE line only
- No explanations or examples
- Maximum 3-5 points per section
- Be direct and actionable
- Skip sections if nothing to report
- Use bullet points only`;

  const review = await generateReview(prompt);
  return review;
};
