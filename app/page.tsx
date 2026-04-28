import { Button } from "@/components/ui/button"
import styles from "./page.module.scss"

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}>
          How to start
        </span>
        <div className={styles.container__onBoarding__steps}>
          <span> 1. Create a page</span>
          <span> 2. Add boards to page</span>
        </div>
        {/* page 추가 button */}
        <Button
          variant={"outline"}
          className="hover: text w-full border-orange-400 bg-transparent text-orange-500 hover:bg-orange-50 hover:text-orange-500"
        >
          {" "}
          Add new page{" "}
        </Button>
      </div>
    </div>
  )
}

export default Home
