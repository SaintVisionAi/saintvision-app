export class TierManager {
  calculateOptimal(analysis: any, context: any): number {
    let tierScore = 1;
    
    if (analysis.emotionalIntensity > 0.8) tierScore += 2;
    if (analysis.complexity > 0.8) tierScore += 2;
    if (analysis.strategicImportance > 0.8) tierScore += 1;
    if (analysis.isFounderMode) tierScore += 2;
    
    return Math.min(Math.max(tierScore, 1), 4);
  }
}
