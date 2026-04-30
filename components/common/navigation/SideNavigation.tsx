"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dot, Search } from "lucide-react";

import styles from "./SideNavigation.module.scss";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner"; // Sonner 확인
import { useEffect, useState } from "react";

function SideNavation() {
  const router = useRouter();
  const [todos, setTodos] = useState<any[]>([]);

  const onCreate = async () => {
    console.log("함수 호출");

    // 1. Supabase DB row 생성
    const { error, status } = await supabase.from("todos").insert([
      {
        title: "",
        start_date: new Date().toISOString(), // 날짜 형식이면 문자열로 넣어주는게 안전합니다
        end_date: new Date().toISOString(),
        contents: [],
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("에러 발생", { description: error.message });
      return;
    }

    if (status === 201) {
      // 2. Sonner 토스트 수정
      toast.success("페이지 생성 완료!", {
        description: "새 todoList 생성되었습니다.",
      });

      // 목록 새로고침
      getTodos();

      // 필요한 경우 이동
      // router.push("/create");
    }
  };

  // supabase에 기존 생성된 페이지 있는지 확인
  const getTodos = async () => {
    // 3. status를 구조분해 할당에 추가
    const { data, error, status } = await supabase.from("todos").select("*");

    // 4. 문법 수정 (const -> if)
    if (status === 200 && data) {
      setTodos(data);
    }

    if (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__searchBox}>
        <Input
          type="text"
          placeholder="검색어 입력 ㄱ"
          className="focus-visible:ring-0"
        />

        <Button variant={"outline"} size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className={styles.container__buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
          onClick={onCreate}
        >
          Add New Page
        </Button>
      </div>

      <div className={styles.container__todos}>
        <span className={styles.container__todos__label}> Your To Do </span>
        <div className={styles.container__todos__list}>
          {todos &&
            todos.map((item: any) => {
              return (
                <div
                  className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer mb-1 px-2 hover:bg-[#ececeb]"
                  key={item.id}
                >
                  <Dot className="mr-1 text-green-400"></Dot>
                  <span className="text-sm">
                    {item.title === "" || item.title === null
                      ? "제목 없음"
                      : item.title}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SideNavation;
