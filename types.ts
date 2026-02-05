
export interface ProductTrend {
  name: string;
  demandScore: number;
  reasoning: string;
  suggestedPrice: string;
  niche: string;
}

export interface GeneratedContent {
  title: string;
  description: string;
  keywords: string[];
  marketingCopy: string;
}

export interface AdPlatformContent {
  headline: string;
  body: string;
  cta: string;
  visualDirection: string;
}

export interface AdCampaign {
  productName: string;
  targetAudience: string;
  platforms: {
    facebook: AdPlatformContent;
    tiktok: AdPlatformContent;
    google: AdPlatformContent;
  };
  suggestedDailyBudget: string;
  scalingStrategy: string;
}

export interface AutomationTask {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed';
  lastRun: string;
  nextRun: string;
}
