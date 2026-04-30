"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import MDEditor from "@uiw/react-md-editor";
import LabelCalendar from "../calendar/LabelCalendar";

// Shadcn UI
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

// sonner import (useToast 아님)
import { toast } from "sonner";

// CSS
import styles from "./MarkdownDialog.module.scss";

function MarkdownDialog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string | undefined>("**hihih**");

  // ========================================
  // Supabase 저장
  const onSubmit = async () => {
    // 1. 유효성 검사
    if (!title || !content || content.trim() === "") {
      toast.error("기입되지 않은 데이터가 있습니다.", {
        description: "제목 혹은 콘텐츠 값을 모두 작성하세요.",
      });
      return;
    }

    // 2. Supabase DB 연동
    const { error, status } = await supabase
      .from("todos")
      .insert([{ title, content }])
      .select();

    if (error) {
      console.error(error);
      // Sonner 사용법: 첫 번째 인자는 메시지(string), 두 번째 인자가 옵션 객체
      toast.error("에러 발생", {
        description: "콘솔 창 에러 확인 ㄱ",
      });
      return;
    }

    if (status === 201) {
      toast.success("생성 완료!", {
        description: "작성한 글이 Supabase에 올바르게 저장되었습니다.",
      });
      // 성공 시 입력창 초기화 등의 로직을 여기에 추가할 수 있습니다.
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer font-normal text-gray-400 hover:text-gray-500">
          Add Contents
        </span>
      </DialogTrigger>

      {/* Tailwind 린트 추천에 따라 sm:max-w-200 사용 */}
      <DialogContent className="flex max-h-[90vh] w-[95vw] flex-col gap-4 p-6 sm:max-w-200">
        <DialogHeader className="shrink-0">
          <DialogTitle asChild>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="h-5 w-5" />
              <input
                type="text"
                placeholder="write a title for your board"
                className={styles.dialog__titleBox__title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add a title and set the duration for your new board.
          </DialogDescription>

          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label="From" />
            <LabelCalendar label="To" />
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex-1 min-h-0">
          <div className={styles.dialog__markdown} data-color-mode="light">
            <MDEditor
              value={content}
              onChange={setContent}
              height="100%"
              preview="live"
            />
          </div>
        </div>

        <DialogFooter className="shrink-0 pt-2">
          <div className={styles.dialog__buttonBox}>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="font-normal text-gray-400 hover:text-gray-500"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-orange-400 font-normal text-white hover:bg-orange-500"
              onClick={onSubmit}
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
