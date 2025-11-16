export interface GamingModeState {
  isActive: boolean;
  budget?: string;
  gameType?: string;
}

export interface IntentMode {
  gaming?: boolean;
  creator?: boolean;
}
