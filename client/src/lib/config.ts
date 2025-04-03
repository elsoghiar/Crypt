// Application configuration settings

// Security settings
export const securityConfig = {
  // Time in milliseconds after which clipboard will be automatically cleared (60 seconds default)
  clipboardClearDelay: 60000,
  
  // Whether clipboard auto-clear is enabled by default
  clipboardAutoClearEnabled: true,
  
  // Local storage keys
  storageKeys: {
    hasSeenSecurityNotice: 'hasSeenSecurityNotice',
    clipboardAutoClearEnabled: 'clipboardAutoClearEnabled',
    clipboardClearDelay: 'clipboardClearDelay'
  }
};

// Default encryption settings
export const encryptionDefaults = {
  algorithm: 'AES-256',
  algorithms: [
    { value: 'AES-256', label: 'AES-256 (Recommended)' },
    { value: 'AES-192', label: 'AES-192' },
    { value: 'AES-128', label: 'AES-128' }
  ]
};