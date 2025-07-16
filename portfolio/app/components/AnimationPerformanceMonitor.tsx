'use client';

import { useEffect, useRef } from 'react';

interface AnimationMetrics {
  fps: number;
  frameTime: number;
  droppedFrames: number;
  totalFrames: number;
}

export default function AnimationPerformanceMonitor() {
  const metricsRef = useRef<AnimationMetrics>({
    fps: 0,
    frameTime: 0,
    droppedFrames: 0,
    totalFrames: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        // 1秒ごとに計測
        const fps = Math.round((frameCount * 1000) / deltaTime);
        const frameTime = deltaTime / frameCount;

        metricsRef.current = {
          fps,
          frameTime,
          droppedFrames: Math.max(0, 60 - fps), // 60fpsを基準
          totalFrames: frameCount,
        };

        // パフォーマンスが悪い場合にコンソールに警告
        if (fps < 30) {
          console.warn('Animation performance is low:', {
            fps,
            frameTime: `${frameTime.toFixed(2)}ms`,
            droppedFrames: metricsRef.current.droppedFrames,
          });
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // 開発環境でのみパフォーマンス情報を表示
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
        <div>FPS: {metricsRef.current.fps}</div>
        <div>Frame: {metricsRef.current.frameTime.toFixed(1)}ms</div>
        <div>Dropped: {metricsRef.current.droppedFrames}</div>
      </div>
    );
  }

  return null;
}

// アニメーションのパフォーマンスを測定するフック
export function useAnimationPerformance() {
  const startTimeRef = useRef<number>(0);
  const endTimeRef = useRef<number>(0);

  const startMeasurement = () => {
    startTimeRef.current = performance.now();
  };

  const endMeasurement = () => {
    endTimeRef.current = performance.now();
    const duration = endTimeRef.current - startTimeRef.current;

    if (duration > 16.67) {
      // 60fps = 16.67ms per frame
      console.warn('Animation took too long:', `${duration.toFixed(2)}ms`);
    }

    return duration;
  };

  return { startMeasurement, endMeasurement };
}
