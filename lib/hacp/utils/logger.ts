export const logger = {
  info: (message: string, data?: any) => {
    console.log('[HACP™ INFO] ' + message, data || '');
  },
  error: (message: string, error?: any) => {
    console.error('[HACP™ ERROR] ' + message, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn('[HACP™ WARN] ' + message, data || '');
  }
};
