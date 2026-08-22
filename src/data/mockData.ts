import type { AnalysisResult } from '../types/analysis';

/**
 * Realistic mock data simulating a software engineering resume analysis.
 * Demonstrates all UI states including mixed scores, matched/missing keywords,
 * ATS issues, missing sections, and bullet rewrites.
 */
export const mockAnalysisResult: AnalysisResult = {
  overallScore: 72,
  verdict: 'Several important improvements recommended',

  categories: {
    atsFormatting: {
      score: 82,
      status: 'good',
      issues: [
        {
          id: 'ats-1',
          severity: 'warning',
          title: 'Table-based layout detected',
          description:
            'Your resume appears to use a table or multi-column layout. Many ATS systems struggle to read content arranged in tables, which can cause sections to be parsed out of order or skipped entirely.',
          suggestion:
            'Convert your resume to a single-column layout with clear section headings. Use line breaks and spacing instead of tables for visual structure.',
        },
        {
          id: 'ats-2',
          severity: 'info',
          title: 'Decorative icons or images detected',
          description:
            'Small icons (e.g., phone, email, LinkedIn logos) were detected. ATS systems cannot interpret images and may skip adjacent text.',
          suggestion:
            'Remove decorative icons and use plain text labels such as "Email:" or "Phone:" instead.',
        },
        {
          id: 'ats-3',
          severity: 'critical',
          title: 'Non-standard section headings',
          description:
            'Some section headings use non-standard names (e.g., "What I\'ve Built" instead of "Projects", "My Journey" instead of "Experience"). ATS systems rely on standard heading names to categorize content.',
          suggestion:
            'Use standard resume section headings: "Experience", "Education", "Skills", "Projects", "Certifications".',
        },
      ],
    },

    keywordMatch: {
      score: 68,
      status: 'needs-improvement',
      matched: [
        'React',
        'TypeScript',
        'Node.js',
        'SQL',
        'REST APIs',
        'Git',
        'Agile',
        'JavaScript',
        'PostgreSQL',
      ],
      missing: [
        'Docker',
        'AWS',
        'CI/CD',
        'Kubernetes',
        'Terraform',
        'GraphQL',
      ],
    },

    bulletQuality: {
      score: 64,
      status: 'needs-improvement',
      bullets: [
        {
          id: 'bullet-1',
          original:
            'Worked on the frontend of the company website using React',
          issue:
            'This bullet is vague, uses a weak action verb ("worked on"), and provides no measurable outcome or scope.',
          issueTag: 'Weak action verb',
          suggested:
            'Rebuilt the company marketing website using React and TypeScript, improving page load speed by 40% and increasing organic traffic by 25%',
        },
        {
          id: 'bullet-2',
          original:
            'Responsible for database management and optimization',
          issue:
            'Starts with "Responsible for" which is passive. No specifics about what databases, what optimizations, or what results were achieved.',
          issueTag: 'Passive language',
          suggested:
            'Optimized PostgreSQL query performance across 12 production databases, reducing average response time from 850ms to 120ms and cutting infrastructure costs by 30%',
        },
        {
          id: 'bullet-3',
          original: 'Helped the team with code reviews and testing',
          issue:
            'Uses the weak verb "helped" and lacks specifics about the volume of work, the type of testing, or the impact on code quality.',
          issueTag: 'No measurable result',
          suggested:
            'Led code review process for a team of 8 engineers, reviewing 50+ pull requests per sprint and reducing production bug rate by 35% through implementation of automated testing standards',
        },
      ],
    },

    sectionCompleteness: {
      score: 85,
      status: 'good',
      present: [
        'Contact Information',
        'Summary',
        'Experience',
        'Education',
        'Skills',
      ],
      missing: ['Certifications', 'Projects'],
    },
  },

  topFixes: [
    {
      rank: 1,
      title: 'Add measurable results to experience bullets',
      explanation:
        'Most of your bullet points describe responsibilities rather than achievements. Adding specific metrics (percentages, dollar amounts, team sizes) makes your resume significantly more compelling to both ATS systems and recruiters.',
      impact: 'high',
    },
    {
      rank: 2,
      title: 'Add missing technical keywords from the job description',
      explanation:
        'Your resume is missing 6 key technical terms that appear in the job description, including Docker, AWS, and CI/CD. Adding these in context will improve your ATS match rate.',
      impact: 'high',
    },
    {
      rank: 3,
      title: 'Use standard resume section headings',
      explanation:
        'Non-standard section names make it harder for ATS systems to categorize your experience. Rename creative headings to industry-standard names.',
      impact: 'high',
    },
    {
      rank: 4,
      title: 'Add a Projects section',
      explanation:
        'A dedicated Projects section showcasing 2–3 relevant technical projects can significantly strengthen your application, especially for roles that value hands-on engineering work.',
      impact: 'medium',
    },
  ],

  metadata: {
    fileName: 'Resume_Alex_Chen.pdf',
    fileSize: 1843200,
    hasJobDescription: true,
    analyzedAt: new Date().toISOString(),
  },
};

/**
 * Mock data variant when no job description is provided.
 * Keyword match is null to demonstrate the empty state.
 */
export const mockAnalysisResultNoJD: AnalysisResult = {
  ...mockAnalysisResult,
  overallScore: 70,
  verdict: 'Several important improvements recommended',
  categories: {
    ...mockAnalysisResult.categories,
    keywordMatch: {
      score: null,
      status: 'unavailable',
      matched: [],
      missing: [],
    },
  },
  topFixes: mockAnalysisResult.topFixes.filter((f) => f.rank !== 2),
  metadata: {
    ...mockAnalysisResult.metadata,
    hasJobDescription: false,
  },
};
