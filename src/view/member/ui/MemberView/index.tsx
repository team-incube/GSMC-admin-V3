import Filter from "@/shared/asset/svg/Filter";
import QuestionMark from "@/shared/asset/svg/QuestionMark";

export default function MemberView() {
  return (
    <div className="flex gap-7.5 mt-12.5">
      <div className="w-143.25 h-184.75 flex flex-col rounded-2xl bg-main-100 overflow-hidden">
        <div className="flex items-center justify-between px-10 pt-9 pb-6">
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-semibold text-main-700">216</p>
            <p className="text-base font-semibold text-black">명</p>
          </div>
          <Filter />
        </div>

        <div className="flex flex-col gap-0 px-5.5 flex-1 overflow-y-auto">
          <article className="flex flex-col rounded-xl bg-main-100">
            <div className="flex justify-between items-center px-8 py-6 rounded-xl">
              <p className="text-lg font-semibold text-gray-600">
                모태환
              </p>
              <p className="text-lg font-semibold text-gray-600">
                2104
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="w-87.5 h-184.75 flex flex-col items-center justify-center rounded-2xl bg-main-100 overflow-hidden">
        <QuestionMark />
        <p className="mt-8 text-2xl font-semibold text-center text-gray-600">
          학생을 선택해주세요
        </p>
      </div>
    </div>
  )
}
