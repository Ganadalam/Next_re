"use client";

import { useState } from "react";
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

// CSS
import styles from "./MarkdownDialog.module.scss";

function MarkdownDialog() {
  const [contents, setContents] = useState<string | undefined>("**hihih**");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer font-normal text-gray-400 hover:text-gray-500">
          Add Contents
        </span>
      </DialogTrigger>

      {/* 린트 수정: sm:max-w-200 적용 */}
      <DialogContent className="flex max-h-[90vh] w-[95vw] flex-col gap-4 p-6 sm:max-w-200">
        {/* 린트 수정: shrink-0 적용 */}
        <DialogHeader className="shrink-0">
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="h-5 w-5" />
              <input
                type="text"
                placeholder="write a title for your board"
                className={styles.dialog__titleBox__title}
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

        {/* 에디터 컨테이너: flex-1과 min-h-0으로 레이아웃 고정 */}
        <div className="flex-1 min-h-0">
          <div className={styles.dialog__markdown}>
            <MDEditor
              value={contents}
              onChange={setContents}
              height="100%"
              preview="live"
            />
          </div>
        </div>

        {/* 린트 수정: shrink-0 적용 */}
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
