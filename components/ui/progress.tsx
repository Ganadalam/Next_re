"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress" // 패키지 경로 확인

import { cn } from "@/lib/utils"

interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string; // 선택 사항 설정
}
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorColor, ...props }, ref) => (

  <ProgressPrimitive.Root
    ref={ref} // ref 전달 추가
    className={cn(
      "relative flex h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // indicatorColor를 템플릿 리터럴로 안전하게 처리
      className={cn("size-full flex-1 transition-all", indicatorColor || "bg-primary")}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName; // 디스플레이 네임 추가

export { Progress }