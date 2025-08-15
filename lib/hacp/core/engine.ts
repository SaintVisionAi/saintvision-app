// ================================
// HACP™ COVENANT ENGINE - Next.js Library Version
// Claude 4 Sonnet 1M Token Beast Mode
// ================================

import Anthropic from '@anthropic-ai/sdk';
import { EventEmitter } from 'events';
import { logger } from '../utils/logger';
import { TierManager } from './tier-manager';
import { ModeManager } from './mode-manager';
import { CovenantProtocol } from './covenant-protocol';
import { CommandJournal } from './command-journal';
import { EmotionalCalibrator } from './emotional-calibrator';

export interface HACPConfig {
  name: string;
  version: string;
  nextjsIntegration?: boolean;
}

export interface ProcessingContext {
  user?: { id: string };
  originalInput?: string;
  timestamp?: string;
  nextjsRoute?: boolean;
  claude4Enhanced?: boolean;
  [key: string]: any;
}

export interface HACPResponse {
  response: string;
  metadata: {
    tier: number;
    mode: string;
    emotionalState: string;
    intent: string;
    confidence: number;
    actions: string[];
    processingTime: number;
    tokensUsed: number;
    model: string;
  };
}

export class HACPCovenantEngine extends EventEmitter {
  private anthropic: Anthropic;
  private tiers: TierManager;
  private modes: ModeManager;
  private covenant: CovenantProtocol;
  private commandJournal: CommandJournal;
  private emotionalCalibrator: EmotionalCalibrator;
  private claude4Config: {
    model: string;
    maxTokens: number;
    temperature: number;
    contextWindowOptimization: boolean;
  };

  constructor(private config: HACPConfig) {
    super();
    
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
    
    // Initialize HACP™ components
    this.tiers = new TierManager();
    this.modes = new ModeManager();
    this.covenant = new CovenantProtocol();
    this.commandJournal = new CommandJournal();
    this.emotionalCalibrator = new EmotionalCalibrator();
    
    // Claude 4 Configuration
    this.claude4Config = {
      model: process.env.ANTHROPIC_CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      maxTokens: parseInt(process.env.MAX_TOKENS || '24000'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.3'),
      contextWindowOptimization: true
    };
  }

  async initialize(): Promise<void> {
    logger.info('🔥 HACP™ Covenant Engine initializing in Next.js...');
    await this.covenant.activate();
    this.emit('engine:ready');
    logger.info('⚡ Claude 4 Sonnet 1M Token engine READY in Next.js!');
  }

  async processMessage(userInput: string, context: ProcessingContext = {}): Promise<HACPResponse> {
    const startTime = Date.now();
    
    try {
      // 1. Advanced Analysis
      const analysis = await this.analyzeInputAdvanced(userInput, context);
      
      // 2. Processing Configuration
      const processingConfig = this.determineOptimalProcessingConfig(analysis, context);
      
      // 3. Covenant Validation
      const covenantCheck = await this.covenant.validateAdvanced(analysis, processingConfig);
      
      // 4. Generate Response
      const response = await this.generateClaude4Response(userInput, context, processingConfig);
      
      // 5. Post-processing
      await this.executePostProcessing(analysis, response, context);
      
      const processingTime = Date.now() - startTime;
      
      return {
        response: response.content,
        metadata: {
          tier: processingConfig.tier,
          mode: processingConfig.mode,
          emotionalState: analysis.emotion,
          intent: analysis.intent,
          confidence: analysis.confidence,
          actions: response.actions,
          processingTime,
          tokensUsed: response.usage?.total_tokens || 0,
          model: this.claude4Config.model
        }
      };
      
    } catch (error) {
      logger.error('HACP™ Processing Error:', error);
      throw error;
    }
  }

  private async analyzeInputAdvanced(userInput: string, context: ProcessingContext) {
    const emotionalAnalysis = await this.emotionalCalibrator.analyzeAdvanced(userInput);
    const intentAnalysis = this.analyzeIntent(userInput, context);
    
    return {
      emotion: emotionalAnalysis.primaryEmotion,
      emotionalIntensity: emotionalAnalysis.intensity,
      intent: intentAnalysis.primaryIntent,
      confidence: intentAnalysis.confidence,
      isFounderMode: this.detectFounderMode(userInput, context),
      complexity: this.calculateComplexity(userInput, context),
      strategicImportance: this.calculateStrategicImportance(userInput, context)
    };
  }

  private determineOptimalProcessingConfig(analysis: any, context: ProcessingContext) {
    const mode = analysis.isFounderMode ? 'founder' : 'execution';
    const tier = this.tiers.calculateOptimal(analysis, context);
    const tokenAllocation = this.calculateOptimalTokens(analysis, tier);
    
    return {
      mode,
      tier,
      systemPrompt: this.buildAdvancedSystemPrompt(mode, tier, analysis),
      maxTokens: tokenAllocation,
      temperature: this.calculateDynamicTemperature(mode, tier, analysis)
    };
  }

  private async generateClaude4Response(userInput: string, context: ProcessingContext, config: any) {
    const messages = [{ role: 'user' as const, content: userInput }];
    
    const response = await this.anthropic.messages.create({
      model: this.claude4Config.model,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      system: config.systemPrompt,
      messages: messages
    });

    return {
      content: response.content[0].text,
      actions: this.extractActions(response.content[0].text),
      usage: response.usage
    };
  }

  private calculateOptimalTokens(analysis: any, tier: number): number {
    const baseTokens = { 1: 4000, 2: 8000, 3: 12000, 4: 16000 };
    let tokens = baseTokens[tier as keyof typeof baseTokens] || 4000;
    
    if (analysis.complexity > 0.8) tokens *= 1.5;
    if (analysis.isFounderMode) tokens = Math.min(tokens * 1.5, 24000);
    
    // Cap at 24000 to avoid streaming requirement
    return Math.min(tokens, 24000);
  }

  private buildAdvancedSystemPrompt(mode: string, tier: number, analysis: any): string {
    const basePrompt = mode === 'founder' 
      ? this.modes.getFounderSystemPrompt() 
      : this.modes.getExecutionSystemPrompt(tier);
    
    return `${basePrompt}

CLAUDE 4 SONNET NEXT.JS INTEGRATION:
- Operating in Next.js environment with full 1M token capacity
- Current tier: ${tier}, Mode: ${mode}
- Emotional state: ${analysis.emotion}
- Complexity: ${analysis.complexity}
- Strategic importance: ${analysis.strategicImportance}`;
  }

  private analyzeIntent(userInput: string, context: ProcessingContext) {
    // Simple intent analysis - can be enhanced
    const intents = {
      sales_lead: /pricing|cost|buy|purchase|plan|subscription/i,
      support_request: /help|issue|problem|error|broken/i,
      strategic_advice: /strategy|planning|advice|recommend|should I/i,
      founder_consultation: /ryan|sal|saint|brother|cuzzo/i
    };

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(userInput)) {
        return { primaryIntent: intent, confidence: 0.8 };
      }
    }

    return { primaryIntent: 'general_inquiry', confidence: 0.6 };
  }

  private detectFounderMode(userInput: string, context: ProcessingContext): boolean {
    const founderTriggers = /ryan|sal|saint|brother|cuzzo|founder/i;
    return founderTriggers.test(userInput) || context.user?.id === 'founder';
  }

  private calculateComplexity(userInput: string, context: ProcessingContext): number {
    let complexity = 0.3;
    if (userInput.length > 200) complexity += 0.2;
    if (userInput.includes('?')) complexity += 0.1;
    if (/strategy|planning|analysis|complex/.test(userInput)) complexity += 0.3;
    return Math.min(complexity, 1.0);
  }

  private calculateStrategicImportance(userInput: string, context: ProcessingContext): number {
    let importance = 0.3;
    if (/business|company|revenue|growth|market/.test(userInput)) importance += 0.4;
    if (context.user?.id === 'founder') importance += 0.3;
    return Math.min(importance, 1.0);
  }

  private calculateDynamicTemperature(mode: string, tier: number, analysis: any): number {
    let temp = 0.3; // Base conservative
    if (mode === 'founder') temp += 0.1; // Slightly more creative for Ryan
    if (analysis.complexity > 0.8) temp += 0.1; // More creative for complex queries
    return Math.min(temp, 0.7);
  }

  private extractActions(responseText: string): string[] {
    // Extract potential actions from response
    const actions = [];
    if (/create.*ticket/i.test(responseText)) actions.push('create_ticket');
    if (/log.*lead/i.test(responseText)) actions.push('log_lead');
    if (/notify.*team/i.test(responseText)) actions.push('notify_team');
    return actions;
  }

  private async executePostProcessing(analysis: any, response: any, context: ProcessingContext): Promise<void> {
    // Log significant interactions
    if (analysis.isFounderMode) {
      await this.commandJournal.log({
        timestamp: new Date().toISOString(),
        user: context.user,
        content: context.originalInput,
        analysis: analysis,
        tone: analysis.emotion,
        domain: this.categorizeDomain(analysis.intent)
      });
    }
  }

  private categorizeDomain(intent: string): string {
    const domainMap: { [key: string]: string } = {
      strategic_advice: 'STRATEGIC',
      founder_consultation: 'STRATEGIC',
      sales_lead: 'FINANCIAL',
      support_request: 'OPERATIONAL'
    };
    return domainMap[intent] || 'GENERAL';
  }
}
