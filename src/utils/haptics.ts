/**
 * Safe Vibration API utility for mobile haptic feedback.
 * Provides subtle tactile patterns to enhance interactive touch responses on supported devices.
 */

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'pulse' | 'celebration';

const HAPTIC_PATTERNS: Record<HapticStyle, number | number[]> = {
  light: 30,
  medium: 50,
  heavy: 80,
  pulse: [40, 50, 40],
  celebration: [40, 60, 60, 60, 100],
};

/**
 * Triggers a vibration pattern if supported by the browser and device.
 * Gracefully degrades on desktop or unsupported devices without throwing errors.
 */
export const triggerHaptic = (style: HapticStyle | number | number[] = 'medium'): boolean => {
  if (typeof window === 'undefined' || !('navigator' in window)) {
    return false;
  }

  try {
    if (typeof navigator.vibrate === 'function') {
      const pattern = typeof style === 'string' ? HAPTIC_PATTERNS[style] : style;
      return navigator.vibrate(pattern);
    }
  } catch {
    // Handled silently if vibration is blocked by user settings or permissions policy
    return false;
  }

  return false;
};
