import Search from '@/shared/asset/svg/Search';
import ModalWrapper from '@/shared/ui/ModalWrapper';

export default function MemberSearchModal() {
  return (
    <ModalWrapper className="box-border h-187.5 w-87.5 px-6 py-9">
      <h2 className="text-main-700 mb-8 text-2xl font-bold">학생찾기</h2>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="placeholder: w-full rounded-lg bg-[#EFF5FF] px-4 py-3 pl-10 font-bold text-black focus:outline-none"
          />
          <div className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform">
            <Search />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-main-700 mb-3 text-lg font-bold">학년</p>
        </div>
        <div className="flex justify-center gap-6">
          <button className="border-main-500 text-main-500 w-20 rounded-lg border px-6 py-3 text-lg font-bold">
            1
          </button>
          <button className="border-main-500 text-main-500 w-20 rounded-lg border px-6 py-3 text-lg font-bold">
            2
          </button>
          <button className="border-main-500 text-main-500 w-20 rounded-lg border px-6 py-3 text-lg font-bold">
            3
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
