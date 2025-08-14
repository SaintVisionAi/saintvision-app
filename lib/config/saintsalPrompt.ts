// Values can come from your env; falling back keeps dev smooth
export const SAINTSAL_PROMPT_ID =
  process.env.PMPT_ID || 'pmpt_689de0aba68881948e84c89e3d373d4408eead4383a5cc06';
export const SAINTSAL_PROMPT_VERSION =
  process.env.PMPT_VERSION || '5';

// Only used as a short hint in metadata; not sent as full system
export const SAINTSAL_SYSTEM =
  'SAINTSAL published prompt runner (landing-page safe hints).';

export default SAINTSAL_SYSTEM;
